'use client'

import React from 'react'
import TextExtractionIcon from '@/../public/text-extraction-logo.svg'
import AutomateHighlight from '@/../public/automate-highlight-logo.svg'
import MultipleOutput from '@/../public/multiple-output-logo.svg'
import SimpleSecure from '@/../public/simple-secure-logo.svg'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Features = () => {
  return (
    <motion.div className='mt-36 w-full flex items-center flex-col px-4'>
      <span className='text-3xl md:text-5xl poppins-bold text-center'>Features</span>
      
      <motion.div 
        className='flex flex-wrap lg:flex-nowrap justify-center mt-14 gap-8 md:gap-14'
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className='flex flex-col justify-start items-start bg-[#1F1F1F] py-6 px-7 rounded-md w-full max-w-xs'
          whileHover={{ y: -10 }}
          transition={{ duration: 0.2, delay: 0 }}
        >
          <Image src={TextExtractionIcon} alt='Text Extraction Icon' width={30} height={30} />
          <span className='text-lg md:text-xl poppins-bold text-white mt-3 mb-2'>Text Extraction</span>
          <span className='text-sm md:text-base poppins-regular text-white'>Extract Text from any PDF in Seconds</span>
        </motion.div>

        {/* Feature Card */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className='flex flex-col justify-start items-start bg-[#1F1F1F] py-6 px-7 rounded-md w-full max-w-xs'
          whileHover={{ y: -10 }}
          transition={{ duration: 0.2, delay: 0 }}
        >
          <Image src={AutomateHighlight} alt='Automate Highlight Icon' width={30} height={30} />
          <span className='text-lg md:text-xl poppins-bold text-white mt-3 mb-2'>Automatic Highlight</span>
          <span className='text-sm md:text-base poppins-regular text-white'>Automatically highlights key information</span>
        </motion.div>

        {/* Feature Card */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          viewport={{ once: true }}
          className='flex flex-col justify-start items-start bg-[#1F1F1F] py-6 px-7 rounded-md w-full max-w-xs'
          whileHover={{ y: -10 }}
          transition={{ duration: 0.2, delay: 0 }}
        >
          <Image src={MultipleOutput} alt='Multiple Output Icon' width={30} height={30} />
          <span className='text-lg md:text-xl poppins-bold text-white mt-3 mb-2'>Multiple Output Formats</span>
          <span className='text-sm md:text-base poppins-regular text-white'>Download as .txt or .doc files.</span>
        </motion.div>

        {/* Feature Card */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className='flex flex-col justify-start items-start bg-[#1F1F1F] py-6 px-7 rounded-md w-full max-w-xs'
          whileHover={{ y: -10 }}
          transition={{ duration: 0.2, delay: 0 }}
        >
          <Image src={SimpleSecure} alt='Simple Secure Icon' width={30} height={30} />
          <span className='text-lg md:text-xl poppins-bold text-white mt-3 mb-2'>Simple and Secure</span>
          <span className='text-sm md:text-base poppins-regular text-white'>No Sign-in required. Your files stay private</span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Features
