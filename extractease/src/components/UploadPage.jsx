'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import CloseBtn from '@/../public/close-icon.svg';
import PDFLogo from '@/../public/pdf-logo.svg';
import UploadIcon from '@/../public/upload-icon.svg';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [dragActive, setDragActive] = useState(false);
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
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer?.files?.length > 0) {
      const uploadedFile = event.dataTransfer.files[0];
      if (uploadedFile && uploadedFile.type === 'application/pdf') {
        setFile(uploadedFile);
        setUploadProgress(0);
        startUpload();
      } else {
        setShowError(true);
      }
    }
  };

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
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/extract', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process the file');
      }

      const data = await response.json();
      console.log('Extracted Data:', data.text);
      console.log('Highlighted Parts:', data.highlights);

      sessionStorage.setItem('text', data.text);
      sessionStorage.setItem('highlights', JSON.stringify(data.highlights));
      sessionStorage.setItem('fileName', file.name);

      router.push(`/text-extract`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    setUploading(false);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <div className="flex flex-col items-center w-full mt-10 px-4 sm:px-6 lg:px-8">
      <label
        htmlFor="file-upload"
        className={`relative w-full flex flex-col items-center max-w-lg rounded-lg min-h-[200px] border-dashed ${
          dragActive ? 'border-blue-500' : 'border-[#FB6666]'
        } border-2 transition-all duration-200`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <Image src={UploadIcon} alt="upload icon" width={30} height={30} className="mt-8" />
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <span className="cursor-pointer poppins-regular text-base sm:text-lg text-white mt-4 text-center">
          Drag & drop files here or click to browse
        </span>
        <span className="poppins-regular text-sm text-white mt-2 text-center">
          Supported format: <span className="poppins-medium text-white">.pdf</span>
        </span>
        <div className="rounded py-2 px-4 bg-[#FB6666] poppins-medium text-sm text-white mt-6 hover:scale-105 transition-all ease-out cursor-pointer">
          Browse files
        </div>
        {uploading && (
          <div className="absolute bottom-4 w-3/4 sm:w-1/2 bg-white rounded-full h-3 border-2 border-white">
            <div
              className="bg-[#FB6666] h-full rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
      </label>

      {file && (
        <div className="w-full max-w-lg rounded-lg flex justify-between items-center mt-6 p-4 border-white border-2 bg-gray-900">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5, ease: 'easeOut' }}
            className="flex items-center"
          >
            <Image src={PDFLogo} alt="pdf icon" width={30} height={30} className="mr-4 w-4 md:w-[30px]" />
            <span className="poppins-medium md:text-sm text-xs w-9/12 text-white truncate">{file.name}</span>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5, ease: 'easeOut' }}
            onClick={handleRemoveFile}
            className="p-2"
          >
            <Image src={CloseBtn} alt="close icon" width={20} height={20} />
          </motion.button>
        </div>
      )}

      <button
        onClick={handleProceed}
        className="poppins-semibold text-sm sm:text-base p-3 bg-[#FB6666] text-white rounded-lg mt-6 hover:scale-105 transition-all ease-out"
      >
        Proceed
      </button>

      {showError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-lg sm:text-xl font-semibold text-[#FB6666]"
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
