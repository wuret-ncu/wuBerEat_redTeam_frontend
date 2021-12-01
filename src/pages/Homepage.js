import React from 'react';
import Navbar from '../components/layout/Navbar';
import Header from '../components/layout/Header';
import Content from '../components/layout/Content';
import Footer from '../components/layout/Footer'; 
import { AuthContext } from '../AuthContextapi';
import { useCallback, useContext, useEffect } from 'react';
import { apiUserDetailsRequest } from '../api';

export default function Homepage() {
    const[userContext, setUserContext] = useContext(AuthContext)

    const fetchUserDetails = useCallback(()=>{
        apiUserDetailsRequest({headers:{Authorization: `Bearer ${userContext.token}`}})
        .then(async res =>{
            if (res.ok){
                const data = await res.json()
                setUserContext( prev => {
                    return {...prev, details :data}
                })
            } else { 
                if(res.status === 401){
                    window.location.reload()
                }else{
                    setUserContext(prev =>{
                        return {...prev, details : null}
                    })
                }
            }
        })
    },[setUserContext, userContext.token])

    useEffect(()=>{
        if(!userContext.details){
            fetchUserDetails()
        }
    },[userContext.details, fetchUserDetails])
    
    return  (
        <div>
            <Navbar /> 
            <Header />
            <Content />
            <Footer />
        </div>   
    )
    
}
