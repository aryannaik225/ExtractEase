'use client'

import React, { useState } from 'react';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setUploadProgress(0); // Reset progress
    }
  };

  const handleUpload = () => {
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 100);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
  };

  return (
    <div className="flex justify-center w-full mt-24 ">
      <div className="w-full max-w-[80vw] p-4 bg-white rounded shadow-md">
        <div className="border-dashed border-2 border-gray-300 p-4 rounded-md mb-4 text-center">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            Drag and drop files here or <span className="text-blue-500 underline">browse</span>
          </label>
        </div>

        {file && (
          <div className="flex items-center justify-between bg-gray-200 p-2 rounded mb-4">
            <span>{file.name}</span>
            <button onClick={handleRemoveFile} className="text-red-500">X</button>
          </div>
        )}

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>

        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={!file || uploadProgress > 0}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
// 