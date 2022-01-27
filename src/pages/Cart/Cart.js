import React from 'react';
import Navbar from '../../components/Navbar';
import CartItem from './component/Cart_Item';
import {Link} from 'react-router-dom';
import './Cart.css';
import { useState, useEffect } from 'react'; 
import { apiCartRecord,apiCreatCart } from '../../global/api';
export default function Cart() {
    const[cartData,setCartData]= useState({
        userId:"61a49c568a5e56e5e18db848",
        history:[
            {
                restaurantName:"全家",
                dish:[
                    {dishName:"咖哩",price:"70"},
                    {dishName:"義大利麵",price:"80"}
                ]
            
            }
        ]
    })

    // useEffect(() => {
    //     apiCreatCart(cartData)
    //     .then(res=>{
    //         console.log(res);
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //     })
    // }, [])

    useEffect(()=>{
        apiCartRecord("6176766141655772211a103a")
        .then(res=>{
            console.log(res);
            console.log(decodeURI(document.cookie.split('%2C')));
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
                    <h5>Shopping Cart</h5>
                    <hr />
                    <CartItem />
                </div>
            </div>
            <div className="container cartsum">
                <hr />
                <div className="row mb-4">
                    <div className="col-8 backtoshop">
                        <Link to="/Homepage" ><i className="fas fa-arrow-left"></i>Back</Link>
                    </div>
                    <div className="col-4">
                        <span className="text-end">Total Price</span>    
                    </div>
                </div>
                <div className="row justify-content-end "> 
                    <div className="col col-md-4 col-sm-8 cartbtn text-end">
                        <button type="button" className="btn btn-outline-dark">check out</button>
                    </div>
                </div>
            </div>
        </>    
    )
}