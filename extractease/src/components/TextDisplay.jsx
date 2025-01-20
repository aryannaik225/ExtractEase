'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const TextDisplayPage = () => {
  const router = useRouter();
  const [text, setText] = useState('');

  useEffect(() => {
    // Ensure router.query is not undefined before accessing text
    if (router.query && router.query.text) {
      setText(router.query.text);
    }
  }, [router.query]); // React to changes in the whole query object

  if (!text) {
    return <div>Loading...</div>; // Show loading until the text is available
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-semibold mb-4">Extracted PDF Text</h1>
      <div className="max-w-[80vw] p-4 border-2 border-[#FB6666] rounded-lg">
        <p className="whitespace-pre-wrap text-sm">{text}</p>
      </div>
      <button 
        onClick={() => router.push('/upload-page')}
        className="poppins-semibold text-base p-3 bg-[#FB6666] text-white rounded-lg mt-6 hover:scale-105 transition-all ease-out"
      >
        Back to Upload
      </button>
    </div>
  );
};

export default TextDisplayPage;
