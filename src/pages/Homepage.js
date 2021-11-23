import React from 'react';
import Navbar from '../components/layout/Navbar';
import Header from '../components/layout/Header';
import Content from '../components/layout/Content';
import Footer from '../components/layout/Footer'; 
import { useEffect } from 'react';
import { apiUserhasLogged } from '../api';

export default function Homepage() {
    useEffect(()=>{
        apiUserhasLogged()
        .then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
    },[])
    return (
        <div>
            <Navbar />
            <Header />
            <Content />
            <Footer />
        </div>        
    )
}
