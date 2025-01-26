from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import fitz  # PyMuPDF
import spacy
import os
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = Flask(__name__) 
CORS(app)
nlp = spacy.load('en_core_web_sm')

def text_rank_summarizer(text, percentage=0.5):
    doc = nlp(text)
    sentences = [sent.text.strip() for sent in doc.sents if sent.text.strip()]

    if not sentences:
        return ["No sentences found in the text."]
    
    sentence_vectors = [nlp(sentence).vector for sentence in sentences]
    if len(sentences) == 1:
        return sentences 

    similarity_matrix = cosine_similarity(sentence_vectors, sentence_vectors)

    scores = np.zeros(len(sentences))
    damping_factor = 0.85
    min_diff = 1e-5
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

    ranked_sentences = sorted(
        [(sentences[i], scores[i]) for i in range(len(sentences))],
        key=lambda x: x[1],
        reverse=True
    )

    num_sentences = max(6, int(percentage * len(sentences)))
    important_sentences = [sentence for sentence, _ in ranked_sentences[:num_sentences]]
    return important_sentences


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

    text = ""
    try:
      with fitz.open(filename) as pdf_document:
          for page_num in range(len(pdf_document)):
              page = pdf_document.load_page(page_num)
              text += page.get_text("text") 

      cleaned_text = clean_extracted_text(text)

      important_lines = text_rank_summarizer(cleaned_text)

      return jsonify({'text': cleaned_text, 'highlights': important_lines})
    finally:
      os.remove(filename)

if __name__ == '__main__':
    app.run(debug=True)
