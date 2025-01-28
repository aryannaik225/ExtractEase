'use client'

import React from 'react'
import Image from 'next/image'

const NavBar = () => {
  return (
    <div className="flex w-full justify-center mt-6 px-4 md:mt-10">
      <div className="flex w-full md:w-10/12 justify-between items-center">
        <a href="/">
          <span className="poppins-bold text-white text-3xl md:text-4xl">
            Extract<span className="text-[#FB6666]">Ease</span>
          </span>
        </a>
        <button
          className="hover:scale-105 transition-all ease-out duration-300 poppins-semibold text-white py-2 px-4 md:px-8 bg-[#FB6666] rounded-sm text-sm md:text-lg flex gap-1 items-center justify-center"
          onClick={() =>
            window.open('https://www.github.com/aryannaik225/ExtractEase')
          }
        >
          <span>Star Us</span>
          <Image
            src="/star.svg"
            width={16}
            height={16}
            alt="star"
            draggable="false"
            className="select-none"
          />
        </button>
      </div>
    </div>
  )
}

export default NavBar
