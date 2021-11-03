import React from 'react';
import Navbar from '../components/layout/Navbar';
import Header from '../components/layout/Header';
import Content from '../components/layout/Content';
import Footer from '../components/layout/Footer'; 

export default function Homepage() {
    return (
        <div>
            <Navbar />
            <Header />
            <Content />
            <Footer />
        </div>        
    )
}
