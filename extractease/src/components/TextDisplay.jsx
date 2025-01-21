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

  // const getHighlightedText = (text, highlights) => {
  //   if (!highlights.length) return text;

  //   let result = []
  //   let lastIndex = 0;
  //   highlights.forEach((highlight, index) => {
  //     result.push(text.slice(lastIndex, highlight.start))

  //     result.push(
  //       <span key={index} className="bg-yellow-200">
  //         {text.slice(highlight.start, highlight.end)}
  //       </span>
  //     )
  //     lastIndex = highlight.end;
  //   })

  //   result.push(text.slice(lastIndex));
  //   return result;
  // }

  const getHighlightedText = (text, highlights) => {
      if(!highlights.length) return text
  
      const sentences = text.split(/(?<=[.!?])\s+/)
      let result = []
  
      sentences.forEach((sentence, index) => {
        if (highlights.some(highlight => highlight.trim() === sentence.trim())) {
          result.push(
            <span key={index} className="bg-yellow-200">
              {sentence}
            </span>
          );
        } else {
          result.push(sentence);
        }
        result.push(<br key={`br-${index}-1`} />); // Add first line break after each sentence
        result.push(<br key={`br-${index}-2`} />); // Add second line break after each sentence
      });
  
      return result;
  };



  const lines = text.split('\n');


  if (!text) {
    return <div className='flex justify-center w-full h-[70vh] items-center'>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <div className='flex justify-between w-full max-w-[80vw]'>
        <div className='flex flex-col w-5/12'>
          <h1 className="text-2xl font-semibold mb-4">Extracted PDF Text</h1>
          <div className="bg-white w-full max-w-[80vw] h-full max-h-[70vh] overflow-y-scroll p-4 border-2 border-[#FB6666] rounded-lg">
            <p className="text-black whitespace-pre-wrap text-sm">{text}</p>
          </div>
        </div>
        <div className='flex flex-col w-5/12'>
          <h1 className="text-2xl font-semibold mb-4">Highlighted Text</h1>
          <div className="bg-white w-full max-w-[80vw] h-full max-h-[70vh] overflow-y-scroll p-4 border-2 border-[#FB6666] rounded-lg">
            {/* <p className="text-black whitespace-pre-wrap text-sm"></p> */}
            {lines.map((line, index) => (
              <p
                key={index}
                className={`text-black whitespace-pre-wrap text-sm ${
                  highlights.some((highlight) => highlight.trim() === line.trim())
                    ? 'bg-yellow-200'
                    : ''
                }`}
              >
                {line.trim()}
              </p>
            ))}
          </div>
        </div>
      </div>
      <button 
        onClick={() => window.location.href = '/upload-page'}
        className="poppins-semibold text-base p-3 bg-[#FB6666] text-white rounded-lg mt-6 hover:scale-105 transition-all ease-out"
      >
        Back to Upload
      </button>
    </div>
  );
};

export default TextDisplayPage;
