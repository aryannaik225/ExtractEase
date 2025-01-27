'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import HighlighterIcon from '@/../public/highlighter-hero.svg' // Small icon
import DocumentIcon from '@/../public/doc-hero.svg' // Small icon
import TextIcon from '@/../public/text-icon-hero.svg' // Small icon
import Texttxt from '@/../public/txt-hero.svg' // Small icon
import PDFIcon from '@/../public/pdf-icon-hero.svg' // Center big icon
import Image from 'next/image'

const HeroSection = () => {

  const smallIconVariants = {
    initial: { opacity: 0, scale: 0, x: 0, y: 0 },
    animate: (custom) => ({
      opacity: 1,
      scale: 1,
      x: [0, custom.x],
      y: [0, custom.y],
      rotate: custom.rotate,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        duration: 2,
        delay: custom.delay,
      },
    }),
  };

  return (
    <div className='flex gap-[200px] justify-center mr-36 mt-40'>
      <div className='flex flex-col'>
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className='text-[48px] 2xl:text-[64px] poppins-bold text-white'
        >
          Extract Text and <br/>
          <Highlight className='text-white'>Highlight</Highlight> from PDFs
        </motion.div>
        <motion.div 
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
            delay: 0.5,
          }}
          className='text-[16px] 2xl:text-[20px] poppins-regular text-white mt-4'
        >
          Upload a PDF and instantly extract, highlight important <br/> content, and download it as a .txt or .doc file.
        </motion.div>
        <div className='flex mt-5 gap-5'>
          <motion.button
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 2.5,
            }}
            whileHover={{ scale: 1.1 }}
            className='py-[17px] px-[15px] bg-[#FB6666] rounded-md poppins-semibold text-[14px] text-white'
            onClick={() => window.location.href = '/upload-page'}
          >
            <motion.span whileHover={{ rotate: -5 }} style={{ display: 'inline-block' }}>Upload your pdf</motion.span>
          </motion.button>
          <motion.button
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
              delay: 3,
            }}
            className='py-[17px] px-[15px] bg-[#4B4B4B] rounded-md poppins-semibold text-[14px] text-white cursor-not-allowed'
          >
            <motion.span className='text-[#9B9191]'>
              No Sign-in Required
            </motion.span>
          </motion.button>
        </div>
      </div>
      <div className="relative flex items-center justify-center">
        {/* Center Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 386 }}
          transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
          className="w-[176px] h-[226px] flex items-center justify-center hover:drop-shadow-[0px_0px_68.2px_#FB6666] transition-[filter] duration-300 ease-in-out"
        >
          <Image src={PDFIcon} alt="PDF Icon" width={176} height={226} />
        </motion.div>

        {/* Small Images */}
        <motion.div
          className="absolute hover:drop-shadow-[0px_0px_18.2px_#d9d9d9] transition-[filter] duration-300 ease-in-out"
          custom={{ x: -120, y: -120, delay: 0, rotate: 465 }}
          variants={smallIconVariants}
          initial="initial"
          animate="animate"
        >
          <Image src={HighlighterIcon} alt="Highlighter Icon" width={50} height={50} />
        </motion.div>
        <motion.div
          className="absolute hover:drop-shadow-[0px_0px_18.2px_#d9d9d9] transition-[filter] duration-300 ease-in-out"
          custom={{ x: 120, y: -120, delay: 0.3, rotate: 700 }}
          variants={smallIconVariants}
          initial="initial"
          animate="animate"
        >
          <Image src={DocumentIcon} alt="Document Icon" width={50} height={50} />
        </motion.div>
        <motion.div
          className="absolute hover:drop-shadow-[0px_0px_18.2px_#d9d9d9] transition-[filter] duration-300 ease-in-out"
          custom={{ x: 120, y: 120, delay: 0.6, rotate: 706 }}
          variants={smallIconVariants}
          initial="initial"
          animate="animate"
        >
          <Image src={TextIcon} alt="Text Icon" width={50} height={50} />
        </motion.div>
        <motion.div
          className="absolute hover:drop-shadow-[0px_0px_18.2px_#d9d9d9] transition-[filter] duration-300 ease-in-out"
          custom={{ x: -120, y: 120, delay: 0.9, rotate: 389 }}
          variants={smallIconVariants}
          initial="initial"
          animate="animate"
        >
          <Image src={Texttxt} alt="Text Txt Icon" width={50} height={50} />
        </motion.div>
      </div>
    </div>
  )
}

export default HeroSection