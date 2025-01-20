import React from 'react';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import TextDisplayPage from '@/components/TextDisplay';

export default function Home() {
    return (
        <div>
            <NavBar />
            <TextDisplayPage />
            <Footer />
        </div>
    )
}