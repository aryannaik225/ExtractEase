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
    <motion.div className='mt-72 w-full flex items-center flex-col'>
      <span className='text-5xl poppins-bold'>Features</span>
      <motion.div className='flex mt-14 gap-14'>


        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -10 }}
          viewport={{ once: true }}
          className='flex flex-col justify-start bg-[#1F1F1F] py-6 px-7 rounded-md'
        >
          <Image src={TextExtractionIcon} alt='Text Extraction Icon' width={30} height={30}/>
          <span className='text-xl poppins-bold text-white w-[219px] mt-3 mb-2'>Text Extraction</span>
          <span className='text-base poppins-regular w-[212px] text-white'>Extract Text from any PDF in Seconds</span>
        </motion.div>


        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -10 }}
          viewport={{ once: true }}
          className='flex flex-col justify-start bg-[#1F1F1F] py-6 px-7 rounded-md'
        >
          <Image src={AutomateHighlight} alt='Automate Highlight Icon' width={30} height={30}/>
          <span className='text-xl poppins-bold text-white w-[219px] mt-3 mb-2'>Automatic Highlight</span>
          <span className='text-base poppins-regular w-[212px] text-white'>Automatically highlights key information</span>
        </motion.div>
        
        
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -10 }}
          viewport={{ once: true }}
          className='flex flex-col justify-start bg-[#1F1F1F] py-6 px-7 rounded-md'
        >
          <Image src={MultipleOutput} alt='Multiple Output Icon' width={24} height={30}/>
          <span className='text-xl poppins-bold text-white w-[219px] mt-3 mb-2'>Multiple Output Formats</span>
          <span className='text-base poppins-regular w-[212px] text-white'>Download as .txt or .doc files.</span>
        </motion.div>
        
        
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -10 }}
          viewport={{ once: true }}
          className='flex flex-col justify-start bg-[#1F1F1F] py-6 px-7 rounded-md'
        >
          <Image src={SimpleSecure} alt='Simple Secure Icon' width={30} height={30}/>
          <span className='text-xl poppins-bold text-white w-[219px] mt-3 mb-2'>Simple and Secure</span>
          <span className='text-base poppins-regular w-[212px] text-white'>No Sign-in required. Your files stay private</span>
        </motion.div>


      </motion.div>
    </motion.div>
  )
}

export default Features