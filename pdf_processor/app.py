from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import fitz  # PyMuPDF
import spacy
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans

app = Flask(__name__)
CORS(app)
nlp = spacy.load('en_core_web_sm')

def find_important_sentences(text):
  doc = nlp(text)
  sentences = [sent.text for sent in doc.sents]

  vectorizer = TfidfVectorizer(stop_words='english')
  X = vectorizer.fit_transform(sentences)

  kmeans = KMeans(n_clusters=1)
  kmeans.fit(X)
  cluster_centers = kmeans.cluster_centers_

  # Find the sentence closest to the cluster center
  most_important = sorted(range(len(X.toarray())), key=lambda i: sum((X.toarray()[i] - cluster_centers[0]) ** 2))
  important_sentences = [sentences[i] for i in most_important[:20]] # Get the top 20 sentences

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
      important_lines = find_important_sentences(cleaned_text)

      return jsonify({'text': cleaned_text, 'highlights': important_lines})
    finally:
      os.remove(filename)

if __name__ == '__main__':
    app.run(debug=True)
