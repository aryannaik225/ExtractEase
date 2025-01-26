'use client'

import React, { useEffect, useState } from 'react';

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
