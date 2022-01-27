import React from 'react'
import Navbar from '../../components/Navbar'
import RecordItem from './component/Record_Item';
import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import { apiUserRecord } from '../../global/api';
export default function Record() {
    const[recordData,setrecordData] = useState([])

    useEffect(()=>{
        apiUserRecord("61a49c568a5e56e5e18db848")
        .then(res=>{
            console.log(res);
            setrecordData(res.data.history)
        })
        .catch(err=>{
            console.log(err);
        })
    },[])
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
