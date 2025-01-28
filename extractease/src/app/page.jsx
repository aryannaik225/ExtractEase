'use client';

import Features from "@/components/Features";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <Features />
      <div className="mt-24 sm:mt-36 w-full flex flex-col items-center px-4 sm:px-8 lg:px-16">
        <motion.span
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl lg:text-4xl poppins-bold text-[#FB6666] text-center"
        >
          Ready to Extract and Highlight your PDF?
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="poppins-medium text-white mt-3 text-sm sm:text-base lg:text-lg text-center"
        >
          Get started with your first file. No sign-up required!
        </motion.span>
        <motion.button
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
            delay: 1,
          }}
          viewport={{ once: true }}
          className="bg-white hover:bg-[#FB6666] py-3 sm:py-[18px] px-10 sm:px-14 rounded text-[#FB6666] hover:text-white transition-colors duration-200 ease-out poppins-bold mt-5 sm:mt-7 text-sm sm:text-base lg:text-xl"
          onClick={() => (window.location.href = "/upload-page")}
        >
          Upload
        </motion.button>
      </div>
      <Footer />
    </div>
  );
}
