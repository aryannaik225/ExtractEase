# ExtractEase

**ExtractEase** is a web application that allows users to upload PDF files, extract the text from them, and view the content. The project aims to simplify text extraction for users by providing an easy-to-use interface for handling PDF files.

<p align='center'>
  <img src='extractease\public\readme-pic.png' width='800px' />
</p>

---

## Overview

**ExtractEase** is a web application built with **Next.js** for the front-end and **Python/Flask** for the backend. It allows users to upload PDF files, extract the text from them, and display it in a readable format. The user-friendly design ensures easy interaction with the app. The future goal is to integrate AI to summarize the extracted text, providing users with an AI-powered summarization tool.

---

## Features

- **PDF Text Extraction**: Upload a PDF, extract its text, and view the content directly on the page.
- **Get Important Highlights**: Get important lines from the extracted text highlighted for you.
- **Download Text**: Download the plain text or highlighted text in desired format.
- **User-friendly Interface**: A clean, intuitive design that helps users easily interact with the app.
- **File Upload**: Drag-and-drop or browse to select a file for processing.
- **Responsive Design**: The app is designed to work across multiple devices with smooth mobile experience.

---

## Technologies Used

- **Frontend**:
  - Next.js
  - Tailwind CSS (for styling)
  - Framer Motion (for animations)
- **Backend**:
  - Python
  - Flask (API)
  - Python Libraries: `PyMuPDF` (for PDF text extraction)

---

## Setup

#### Prerequisites
Before getting started, ensure that you have the following tools installed:
- **Node.js** (for the front-end)
- **npm** or **yarn** (for managing dependencies)
- **Python** and **pip** (for the backend)

#### Installation
Clone the repository to your local machine:
```bash
  git clone https://github.com/aryannaik225/ExtractEase.git
```

**Backend Setup**
1. Navigate to the `pdf_processor` folder:
```bash
cd pdf_processor
```

2. Setup a virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate # On macOS/Linux
venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

**Frontend Setup**
1. Navigate to the `extractease` folder:
```bash
cd extractease
```

2. Install dependencies:
```bash
npm install
```

#### Running the Project
1. Start teh backend (Flask API):
```bash
python app.py
```
The Flask server will run on `http://127.0.0.1:5000`.

2. Start the frontend (Next.js app):
```bash
npm run dev
```
The frontend will be available at `http://localhost:3000`

---

## Usage
1. Go to the homepage of the app (`/`).
2. **Upload a PDF** by either dragging and dropping the file or clicking to browse.
3. Once the file is uploaded, the text will be extracted and displayed on the page.
4. Click "**Proceed**" to move forward with the extracted text for processing or other functionalities.

---

## Future Ideas
- **Summarize Using AI**: Integrate AI for summarizing extracted text. This could involve using models like Gemini or ChatGPT.

---

## Contributing
Contributions are welcome!! To contribute to **ExtractEase**, follow these steps:
1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Open a pull request.

---

## License
This project is licensed under the MIT License - see the [License](./LICENSE) file for details.