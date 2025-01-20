'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { HeroHighlight, Highlight } from "./ui/hero-highlight";

const HeroSection = () => {
  return (
    <div>
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
        className='text-[64px] poppins-bold text-white'
      >
        Extract Text and <br/>
        <Highlight className='text-white'>Highlight</Highlight> from PDFs
      </motion.div>
    </div>
  )
}

export default HeroSection