import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import UploadPage from '@/components/UploadPage';
import React from 'react';

export default function Home() {
  return (
    <div>
      <NavBar />
      <UploadPage />
      <div>
        <Footer />
      </div>
    </div>
  )
}