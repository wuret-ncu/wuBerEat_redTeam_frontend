import React from 'react'
import Navbar from '../../components/Navbar'
import RecordItem from './component/Record_Item';
import { AuthContext } from '../../global/AuthContext';
import { useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import { apiUserRecord, apiUserDetailsRequest } from '../../global/api';
export default function Record() {
    const [userContext, setUserContext] = useContext(AuthContext)
    const[recordData,setrecordData] = useState([])
    const [userId,setUserId] = useState("")

    //get user ID
    useEffect(()=>{
        apiUserDetailsRequest({
            headers:{
                Authorization: `Bearer ${userContext.token}`}
        })
        .then(async response =>{
            if(response.statusText === 'OK'){
                const data = await response.data
                setUserId(data._id)
            }else{
                if(response.status === 401){
                    window.location.reload()
                }else{
                    setUserContext( prevData =>{
                        return{...prevData, details : null}
                    })
                }
            }
        })
    },[])

    //get user record
    useEffect(()=>{
        if(userId !== ""){
        apiUserRecord(userId)
        .then(res=>{
            console.log(res);
            console.log(userId);
            setrecordData(res.data.history)
        })
        .catch(err=>{
            console.log(err);
        })
        }
    },[userId])
    return (
        <>
            <Navbar />
             <div className="container cartkv">
                <div className="row">
                    <div className="col-3 col-lg-1 backtoshop">
                        <Link to="/Homepage" style={{textDecoration:null,color:'black'}}><i className="fas fa-arrow-left"></i>&nbsp;Back</Link>
                    </div>
                        <div className="col">
                            <h5 style={{textAlign:'center'}}>Shopping Record</h5>
                        </div>
                    <hr />
                   
                        {
                            recordData.map(item=>{
                                const{dish,restaurantName} = item
                                return(
                                    <RecordItem 
                                    dish={dish}
                                    restaurantName={restaurantName}
                                    />
                                )
                            })
                        }
                    
                </div>
            </div>
        </>
    )
}
