  'use client'

  import React, { useState } from 'react';
  import Image from 'next/image';
  import CloseBtn from '@/../public/close-icon.svg';
  import PDFLogo from '@/../public/pdf-logo.svg';
  import UploadIcon from '@/../public/upload-icon.svg';
  import { motion } from 'framer-motion';
  import { useRouter } from 'next/navigation';
  import { redirect } from 'next/navigation';


  const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [processing, setProcessing] = useState(false);
    const router = useRouter();

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


    const handleDrop = (event) => {
      event.preventDefault()
      event.stopPropagation()
      setDragActive(false)
      if (event.dataTransfer?.files?.length > 0) {
        const uploadedFile = event.dataTransfer.files[0]
        if (uploadedFile && uploadedFile.type === 'application/pdf') {
          setFile(uploadedFile);
          setUploadProgress(0);
          startUpload();
        } else {
          setShowError(true);
        }
      }
    }


    const handleDragOver = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setDragActive(true);
    };

    const handleDragEnter = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setDragActive(true);
    };

    const handleDragLeave = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setDragActive(false);
    };


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

    const handleProceed = async () => {
      // go to python code here
      if (!file) return
      setProcessing(true)

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('https://extractease-5ybk.onrender.com/extract',{
          method : 'POST',
          body : formData,
        })

        if(!response.ok) {
          throw new Error('Failed to process the file')
        }

        const data = await response.json()
        console.log('Extracted Data:', data.text)
        console.log('Highlighted Parts:', data.highlights)

        const queryString = new URLSearchParams ({
          text : data.text,
          highlights : JSON.stringify(data.highlights),
        }).toString()

        sessionStorage.setItem('text', data.text)
        sessionStorage.setItem('highlights', JSON.stringify(data.highlights))
        sessionStorage.setItem('fileName', file.name)

        router.push(`/text-extract`)

      } catch (error) {
        console.error('Error:', error)
      } finally {
        setProcessing(false)
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
        <label 
          htmlFor='file-upload' 
          className='relative w-full flex flex-col items-center max-w-[90vw] sm:max-w-[80vw] rounded-lg min-h-80 border-dashed border-[#FB6666] border-2'
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}  
        >
          <Image src={UploadIcon} alt='upload icon' width={30} height={30} className='mt-11'/>
          <input
            type='file'
            accept='.pdf'
            onChange={handleFileChange}
            className='hidden'
            id='file-upload'
          />
          <span className='cursor-pointer poppins-regular text-base sm:text-xl text-white mt-8'>Drag & drop files here or click to browse</span>
          <span className='poppins-regular text-xs sm:text-base text-white mt-3'>Supported format : <span className='poppins-medium text-base text-white'>.pdf</span></span>
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
              <span className='poppins-medium text-sm sm:10/12 truncate md:w-auto text-white'>{file.name}</span>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5, ease: 'easeOut' }}
              onClick={handleRemoveFile} 
              className="p-2"
            >
              <Image src={CloseBtn} alt='close icon' width={20} height={20} className='w-5 h-5 sm:w-5 sm:h-5'/>
            </motion.button>
          </div>
        )}

        <button 
          onClick={handleProceed} 
          disabled={processing}
          className={`poppins-semibold text-base p-3 rounded-lg mt-6 transition-all ease-out flex items-center justify-center ${processing ? 'bg-[#FB6666] cursor-not-allowed' : 'bg-[#FB6666] hover:scale-105 text-white'}`}
        >
          {processing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className='w-5 h-5 border-4 border-white border-t-transparent rounded-full'
            />
          ) : (
            'Proceed'
          )}
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
