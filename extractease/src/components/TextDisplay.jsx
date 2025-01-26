'use client'

import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';

const TextDisplayPage = () => {

  const [text, setText] = useState('');
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    const storedText = sessionStorage.getItem('text');
    const storedHighlights = sessionStorage.getItem('highlights');
    setText(storedText);
    setHighlights(JSON.parse(storedHighlights));
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

  const downloadText = (format) => {
    let fileContent = text;
    const fileName = format === 'txt' ? 'extracted-text.txt' : 'extracted-text.doc';

    if (format === 'doc') {
      // For doc format, wrap the text in a simple HTML structure
      fileContent = `<html><body><pre>${text}</pre></body></html>`;
    }

    const blob = new Blob([fileContent], { type: 'application/octet-stream' });
    saveAs(blob, fileName); 
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
          <div className='flex justify-center'>
            {/* Dropdown Button */}
            <div className='relative'>
              <button className='flex justify-between w-11/12 poppins-semibold text-base p-3 bg-[#FB6666] text-white rounded-lg mt-6 hover:scale-105 transition-all ease-out'>
                Download Text
                <span className='ml-2'>▼</span>
              </button>
              <div className='absolute right-0 w-32 mt-2 bg-white border rounded shadow-md'>
                <button
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                  onClick={() => downloadText('txt')}
                >
                  .txt
                </button>
                <button
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                  onClick={() => downloadText('doc')}
                >
                  .doc
                </button>
              </div>
            </div>
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
          <div className='flex justify-center'>
          <button className='flex justify-between w-11/12 poppins-semibold text-base p-3 bg-[#FB6666] text-white rounded-lg mt-6 hover:scale-105 transition-all ease-out'>
              <span className='opacity-0'>.doc</span>
              Download Highlighted Text
              <span>.doc</span>
            </button>
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
