  'use client'

  import React, { useState } from 'react';
  import Image from 'next/image';
  import CloseBtn from '@/../public/close-icon.svg';
  import PDFLogo from '@/../public/pdf-logo.svg';
  import UploadIcon from '@/../public/upload-icon.svg';
  import { motion } from 'framer-motion';
  import { useRouter } from 'next/navigation';
  import * as pdfjsLib from 'pdfjs-dist/webpack';

  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

  const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [extractedText, setExtractedText] = useState('');
    const router = useRouter();

    const extractTextFromPdf = async (pdfFile) => {
      const fileReader = new FileReader();
      return new Promise((resolve, reject) => {
        fileReader.onload = async () => {
          try {
            const pdfBytes = new Uint8Array(fileReader.result);
            const pdfDoc = await pdfjsLib.getDocument(pdfBytes).promise;  // Load PDF using pdf.js
            let text = '';
            const numPages = pdfDoc.numPages;
            
            // Loop through pages and extract text
            for (let pageNum = 1; pageNum <= numPages; pageNum++) {
              const page = await pdfDoc.getPage(pageNum);
              const content = await page.getTextContent();
              content.items.forEach((item) => {
                text += item.str + ' ';
              });
            }
            resolve(text);
          } catch (error) {
            reject(error);
          }
        };
        fileReader.onerror = () => reject(new Error('File reading error.'));
        fileReader.readAsArrayBuffer(pdfFile);
      });
    };
    

    // Handle file change
    const handleFileChange = (event) => {
      const uploadedFile = event.target.files[0];
      if (uploadedFile && uploadedFile.type === 'application/pdf') {
        setFile(uploadedFile);
        setUploadProgress(0);
        startUpload();
      } else {
        setShowError(true);
      }
    };

    // Start the upload process
    const startUpload = () => {
      setUploading(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
          }, 500);
        }
      }, 100);
    };

    

    // Handle proceed after text extraction
    const handleProceed = async () => {
      try {
        const extracted = await extractTextFromPdf(file);
        setExtractedText(extracted);
        // Redirect to the text display page with the extracted text
        console.log("Navigating to:", { pathname: '/text-extract', query: { text: extracted } });
        if (router) {
          console.log("Navigating to:", { pathname: '/text-extract', query: { text: extracted } });
          router.push(`/text-extract?text=${encodeURIComponent(extracted)}`);
        } else {
          console.error("Router is not initialized yet");
        }
      } catch (error) {
        console.error('Error extracting text from pdf:', error);
      }
    };

    // Remove the uploaded file
    const handleRemoveFile = () => {
      setFile(null);
      setUploadProgress(0);
      setUploading(false);
    };

    // Close error message
    const handleCloseError = () => {
      setShowError(false);
    };

    return (
      <div className='flex flex-col items-center w-full mt-20'>
        <label htmlFor='file-upload' className='relative w-full flex flex-col items-center max-w-[80vw] rounded-lg min-h-80 border-dashed border-[#FB6666] border-2'>
          <Image src={UploadIcon} alt='upload icon' width={30} height={30} className='mt-11'/>
          <input
            type='file'
            accept='.pdf'
            onChange={handleFileChange}
            className='hidden'
            id='file-upload'
          />
          <span className='cursor-pointer poppins-regular text-xl text-white mt-8'>Drag & drop files here or click to browse</span>
          <span className='poppins-regular text-base text-white mt-3'>Supported format : <span className='poppins-medium text-base text-white'>.pdf</span></span>
          <div className='rounded py-3 px-6 bg-[#FB6666] poppins-medium text-sm text-white mt-8 hover:scale-105 transition-all ease-out cursor-pointer'>
            Browse files
          </div>
          {uploading && (
            <div className="absolute bottom-4 w-6/12 bg-white rounded-full h-3 border-2 border-white">
              <div
                className="bg-[#FB6666] h-full rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
        </label>

        {file && (
          <div className="w-full max-w-[80vw] rounded-lg flex justify-between items-center mt-6 p-4 border-white border-2 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5, ease: 'easeOut' }}
              className="flex items-center"
            >
              <Image src={PDFLogo} alt='pdf icon' width={30} height={30} className='mr-4'/>
              <span className='poppins-medium text-sm text-white'>{file.name}</span>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5, ease: 'easeOut' }}
              onClick={handleRemoveFile} 
              className="p-2"
            >
              <Image src={CloseBtn} alt='close icon' width={20} height={20} />
            </motion.button>
          </div>
        )}

        <button onClick={handleProceed} className='poppins-semibold text-base p-3 bg-[#FB6666] text-white rounded-lg mt-6 hover:scale-105 transition-all ease-out'>
          Proceed
        </button>

        {showError && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-4/5 max-w-md p-6 rounded-lg shadow-lg text-center">
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-xl font-semibold text-[#FB6666]"
              >
                Invalid File Format
              </motion.h2>
              <p className="mt-4 text-sm text-gray-700">
                Please upload a valid PDF file. The current file format is not supported.
              </p>
              <button 
                onClick={handleCloseError} 
                className="mt-6 bg-[#FB6666] text-white py-2 px-4 rounded-lg hover:bg-[#e45a5a]"
              >
                Close
              </button>
            </div>
          </div>
        )}
        
      </div>
    );
  };

  export default UploadPage;
