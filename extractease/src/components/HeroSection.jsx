'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { HeroHighlight, Highlight } from './ui/hero-highlight'
import HighlighterIcon from '@/../public/highlighter-hero.svg'
import DocumentIcon from '@/../public/doc-hero.svg'
import TextIcon from '@/../public/text-icon-hero.svg'
import Texttxt from '@/../public/txt-hero.svg'
import PDFIcon from '@/../public/pdf-icon-hero.svg'
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
  }

  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-[200px] justify-center items-center mx-4 md:mx-0 mt-20 md:mt-40">
      <div className="flex flex-col text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-[36px] md:text-[48px] 2xl:text-[64px] poppins-bold text-white"
        >
          Extract Text and <br />
          <Highlight className="text-white">Highlight</Highlight> from PDFs
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
            delay: 0.5,
          }}
          className="text-[14px] md:text-[16px] 2xl:text-[20px] poppins-regular text-white mt-4"
        >
          Upload a PDF and instantly extract, highlight important <br /> content,
          and download it as a .txt or .doc file.
        </motion.div>
        <div className="flex flex-col md:flex-row mt-5 gap-3 md:gap-5 justify-center md:justify-start">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 10,
              delay: 2.5,
            }}
            whileHover={{ scale: 1.1 }}
            transition= {{ duration: 0.2, delay: 0 }}
            className="py-3 px-5 bg-[#FB6666] rounded-md poppins-semibold text-[14px] text-white"
            onClick={() => (window.location.href = '/upload-page')}
          >
            <motion.span whileHover={{ rotate: -5 }} style={{ display: 'inline-block' }}>
              Upload your pdf
            </motion.span>
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
              delay: 3,
            }}
            className="py-3 px-5 bg-[#4B4B4B] rounded-md poppins-semibold text-[14px] text-white cursor-not-allowed"
          >
            <motion.span className="text-[#9B9191]">No Sign-in Required</motion.span>
          </motion.button>
        </div>
      </div>
      <div className="relative flex items-center justify-center">
        {/* Center Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 386 }}
          transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
          className="w-[120px] md:w-[176px] h-[180px] md:h-[226px] flex items-center justify-center hover:drop-shadow-[0px_0px_68.2px_#FB6666] transition-[filter] duration-300 ease-in-out"
        >
          <Image src={PDFIcon} alt="PDF Icon" width={176} height={226} />
        </motion.div>
        {/* Small Images */}
        {[
          { icon: HighlighterIcon, x: -120, y: -120, rotate: 465 },
          { icon: DocumentIcon, x: 120, y: -120, rotate: 700 },
          { icon: TextIcon, x: 120, y: 120, rotate: 706 },
          { icon: Texttxt, x: -120, y: 120, rotate: 389 },
        ].map((iconProps, index) => (
          <motion.div
            key={index}
            className="absolute hover:drop-shadow-[0px_0px_18.2px_#d9d9d9] transition-[filter] duration-300 ease-in-out"
            custom={{ ...iconProps, delay: index * 0.3 }}
            variants={smallIconVariants}
            initial="initial"
            animate="animate"
          >
            <Image src={iconProps.icon} alt="Icon" width={40} height={40} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default HeroSection
