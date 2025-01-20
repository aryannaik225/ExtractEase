'use client'

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
      <div className="mt-44 w-full flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl poppins-bold text-[#FB6666]"
        >
          Ready to Extract and Highlight your PDF?
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="poppins-medium text-white mt-3 text-lg"
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
          className="bg-white py-[18px] px-14 rounded text-[#FB6666] poppins-bold mt-7 text-xl"
          onClick={() => window.open("/upload-page")}
        >
          Upload
        </motion.button>
      </div>
      <Footer />
    </div>
  );
}
