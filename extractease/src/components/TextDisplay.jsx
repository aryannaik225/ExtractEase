'use client'

import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import Image from 'next/image';

const TextDisplayPage = () => {

  const [text, setText] = useState('');
  const [highlights, setHighlights] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [format1, setFormat1] = useState('txt');
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [format2, setFormat2] = useState('txt');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    const storedText = sessionStorage.getItem('text');
    const storedHighlights = sessionStorage.getItem('highlights');
    const fileName = sessionStorage.getItem('fileName');
    setText(storedText);
    setHighlights(JSON.parse(storedHighlights));
    setFileName(fileName);
  }, [])

  const getHighlightedText = (text, highlights) => {
    if (!highlights.length) return text;
  
    const urlRegex = /(https?:\/\/[^\s]+)|([\w-]+\.(txt|pdf|doc|docx|html|jpg|png))/gi;
  
    const parts = text.split(urlRegex);
  
    let result = [];
  
    parts.forEach((part, index) => {
      if (part && urlRegex.test(part)) {
        result.push(<span key={`url-${index}`}>{part}</span>);
      } else if (part) {
        let highlightedPart = part;
        highlights.forEach(highlight => {
          const regex = new RegExp(`(${highlight.trim()})`, "gi");
          highlightedPart = highlightedPart.replace(
            regex,
            '<span class="bg-yellow-200">$1</span>'
          );
        });
  
        result.push(
          <span key={`text-${index}`} dangerouslySetInnerHTML={{ __html: highlightedPart }} />
        );
      }
    });
  
    return result;
  };
  
  const lines = text.split('\n');

  const downloadHighlightedText = (format) => {
    const sanitizedFileName = fileName.replace(/\.pdf$/, "");
    const downloadFileName = format === "txt" ? `${sanitizedFileName}_highlighted.txt` : `${sanitizedFileName}_highlighted.doc`;
  
    let fileContent = text;
    if (format === "doc") {
      // Generate HTML content with highlights
      fileContent = `
        <html>
          <head>
            <meta charset="UTF-8">
          <style>span { background-color: yellow; }</style></head>
          <body>
            ${lines
              .map((line) =>
                highlights.reduce(
                  (updatedLine, highlight) =>
                    updatedLine.replace(
                      new RegExp(`(${highlight.trim()})`, "gi"),
                      '<span>$1</span>'
                    ),
                  line
                )
              )
              .join("<br>")}
          </body>
        </html>
      `;
    }
  
    const blob = new Blob([fileContent], { type: "application/msword;charset=utf-8" });
    saveAs(blob, downloadFileName);
  };
  

  const downloadText = (format) => {
    let fileContent = text;
    const sanitizedFileName = fileName.replace(/\.pdf$/, "");

    const downloadFileName = format === "txt" ? `${sanitizedFileName}.txt` : `${sanitizedFileName}.doc`;

    if (format === 'doc') {
      // For doc format, wrap the text in a simple HTML structure
      fileContent = `<html>
                      <head>
                        <meta charset="UTF-8">
                          <style>
                            body {
                              font-family: Calibri, sans-serif;
                              font-size: 12pt;
                            }
                            pre {
                              font-family: Calibri, sans-serif;
                              font-size: 12pt;
                            }
                          </style>
                      </head>
                      <body>
                        <pre>
                          ${text}
                        </pre>
                      </body>
                    </html>
                    `}

    const blob = new Blob([fileContent], { type: 'application/octet-stream' });
    saveAs(blob, downloadFileName); 
  }


  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  }

  const handleDropdown1 = () => {
    setShowDropdown1(!showDropdown1);
  }


  if (!text) {
    return <div className='flex justify-center w-full h-[70vh] items-center'>Loading...</div>
  }

  return(
    <div className="flex flex-col items-center mt-10">
      <div className="flex justify-between w-full max-w-[80vw]">
        <div className="flex flex-col w-5/12">
          <h1 className="text-2xl font-semibold mb-4">Extracted PDF Text</h1>
          <div className="bg-white w-full max-w-[80vw] h-full max-h-[70vh] overflow-y-scroll p-4 border-2 border-[#FB6666] rounded-lg">
            <div className="bg-white w-full max-w-[80vw] h-full max-h-[70vh] overflow-y-scroll p-4 border-2 border-[#FB6666] rounded-lg">
              <p className="text-black whitespace-pre-wrap text-sm">{text}</p>
            </div>
          </div>
          <div className='flex justify-center relative'>
            {/* Dropdown Button */}
              <div className='flex justify-between w-11/12 poppins-semibold text-base p-3 bg-[#FB6666] text-white rounded-lg mt-6 hover:scale-105 transition-all ease-out cursor-pointer' onClick={() => downloadText(format1)}>
                <button></button>
                Download Text ({format1})
                <button className='flex justify-center items-center h-full aspect-square bg-[#FB6666] rounded-md text-white hover:bg-[#F9A8A8] transition-all ease-out' onClick={(e) => { e.stopPropagation(); handleDropdown(); }}>
                  <Image src='/drop-down.svg' width={20} height={20} alt='drop-down' className={`${showDropdown ? 'rotate-180' : ''} transition-all duration-200 ease-out`}/>
                </button>
              </div>
            {showDropdown && (
              <div className="absolute top-full mt-2 w-11/12 bg-white shadow-lg rounded-lg z-10">
                <ul className="p-2 text-black">
                  <li onClick={() => { setFormat1('txt'); handleDropdown(); }} className="p-2 hover:bg-gray-300 transition-colors duration-300 ease-out rounded-md cursor-pointer">txt format</li>
                  <li onClick={() => { setFormat1('doc'); handleDropdown(); }} className="p-2 hover:bg-gray-300 transition-colors duration-300 ease-out rounded-md cursor-pointer">doc format</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-5/12">
          <h1 className="text-2xl font-semibold mb-4">Highlighted Text</h1>
          <div className="bg-white w-full max-w-[80vw] h-full max-h-[70vh] overflow-y-scroll p-4 border-2 border-[#FB6666] rounded-lg">
            <div className="bg-white w-full max-w-[80vw] h-full max-h-[70vh] overflow-y-scroll p-4 border-2 border-[#FB6666] rounded-lg">
              <p className="text-black whitespace-pre-wrap text-sm">
                {getHighlightedText(text, highlights)}
              </p>
            </div>
          </div>
          <div className='flex justify-center relative'>
            {/* Dropdown Button */}
              <div className='flex justify-between w-11/12 poppins-semibold text-base p-3 bg-[#FB6666] text-white rounded-lg mt-6 hover:scale-105 transition-all ease-out cursor-pointer' onClick={() => downloadHighlightedText(format2)}>
                <button></button>
                Download Highlighted Text ({format2})
                <button className='flex justify-center items-center h-full aspect-square bg-[#FB6666] rounded-md text-white hover:bg-[#F9A8A8] transition-all ease-out' onClick={(e) => { e.stopPropagation(); handleDropdown1(); }}>
                  <Image src='/drop-down.svg' width={20} height={20} alt='drop-down' className={`${showDropdown1 ? 'rotate-180' : ''} transition-all duration-200 ease-out`}/>
                </button>
              </div>
            {showDropdown1 && (
              <div className="absolute top-full mt-2 w-11/12 bg-white shadow-lg rounded-lg z-10">
                <ul className="p-2 text-black">
                  <li onClick={() => { setFormat2('txt'); handleDropdown1(); }} className="p-2 hover:bg-gray-300 transition-colors duration-300 ease-out rounded-md cursor-pointer">txt format</li>
                  <li onClick={() => { setFormat2('doc'); handleDropdown1(); }} className="p-2 hover:bg-gray-300 transition-colors duration-300 ease-out rounded-md cursor-pointer">doc format</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => (window.location.href = "/upload-page")}
        className="poppins-semibold text-base p-3 bg-[#FB6666] text-white rounded-lg mt-6 hover:scale-105 transition-all ease-out"
      >
        Back to Upload
      </button>
    </div>
  );
};

export default TextDisplayPage;
