from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import fitz  # PyMuPDF
import spacy
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.cluster import KMeans
from collections import Counter
import numpy as np

app = Flask(__name__)
CORS(app)
nlp = spacy.load('en_core_web_sm')

def find_important_sentences(text, num_sentences=None):
    # Step 1: Process the text and split into sentences
    doc = nlp(text)
    sentences = [sent.text.strip() for sent in doc.sents]

    # Step 2: Create a TF-IDF vectorizer to score sentences
    vectorizer = TfidfVectorizer(stop_words="english", max_features=50)  # Focus on important terms
    sentence_vectors = vectorizer.fit_transform(sentences)

    # Step 3: Summarize sentences based on their importance
    sentence_scores = sentence_vectors.sum(axis=1).flatten()  # Sum up TF-IDF scores for each sentence
    scored_sentences = [(sentences[i], sentence_scores[i]) for i in range(len(sentences))]
    sorted_sentences = sorted(scored_sentences, key=lambda x: x[1], reverse=True)

    # Step 4: Determine how many sentences to return
    if not num_sentences:
        total_tokens = len([token for token in doc if token.is_alpha])
        num_sentences = max(3, min(len(sentences), total_tokens // 100))  # At least 3 sentences

    # Step 5: Return the top N sentences
    important_sentences = [sentence for sentence, _ in sorted_sentences[:num_sentences]]
    return important_sentences


def text_rank_summarizer(text, num_sentences=5):
    # Step 1: Preprocess text and split into sentences
    doc = nlp(text)
    sentences = [sent.text.strip() for sent in doc.sents if sent.text.strip()]

    if not sentences:
        return ["No sentences found in the text."]
    
    # Step 2: Create sentence embeddings using SpaCy
    sentence_vectors = [nlp(sentence).vector for sentence in sentences]
    if len(sentences) == 1:
        return sentences  # If there's only one sentence, return it directly

    # Step 3: Calculate cosine similarity matrix
    similarity_matrix = cosine_similarity(sentence_vectors, sentence_vectors)

    # Step 4: Apply TextRank (Graph-based Scoring)
    scores = np.zeros(len(sentences))
    damping_factor = 0.85
    min_diff = 1e-5  # Convergence threshold
    max_iter = 100

    for _ in range(max_iter):
        prev_scores = np.copy(scores)
        for i in range(len(sentences)):
            scores[i] = (1 - damping_factor) + damping_factor * sum(
                similarity_matrix[i][j] * prev_scores[j] / np.sum(similarity_matrix[j]) 
                for j in range(len(sentences)) if similarity_matrix[i][j] != 0
            )
        if np.sum(np.abs(scores - prev_scores)) < min_diff:
            break

    # Step 5: Rank sentences by their TextRank scores
    ranked_sentences = sorted(
        [(sentences[i], scores[i]) for i in range(len(sentences))],
        key=lambda x: x[1],
        reverse=True
    )

    # Step 6: Select top N sentences
    important_sentences = [sentence for sentence, _ in ranked_sentences[:num_sentences]]
    return important_sentences


# Clean the extracted text
def clean_extracted_text(raw_text):
  lines = raw_text.split('\n')
  cleaned_text = ""

  for i in range(len(lines)):
    line = lines[i].strip()
    if not line:
       continue
    
    if line.endswith(('.', '!', '?')) or i == len(lines) - 1:
        cleaned_text += line + '\n\n'
    else:
        cleaned_text += line + ' '

  return cleaned_text



@app.route('/extract', methods=['POST'])
def extract_text_from_pdf():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    filename = secure_filename(file.filename)
    file.save(filename)

    # Extract text from PDF 
    text = ""
    try:
      with fitz.open(filename) as pdf_document:
          for page_num in range(len(pdf_document)):
              page = pdf_document.load_page(page_num)
              text += page.get_text("text")  # Extract text in a simple format

      cleaned_text = clean_extracted_text(text)

      # Use NLP to find important lines
      important_lines = text_rank_summarizer(cleaned_text)

      return jsonify({'text': cleaned_text, 'highlights': important_lines})
    finally:
      os.remove(filename)

if __name__ == '__main__':
    app.run(debug=True)
