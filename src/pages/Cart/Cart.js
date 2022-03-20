import React from 'react';
import Navbar from '../../components/Navbar';
import CartItem from './component/Cart_Item';
import {Link} from 'react-router-dom';
import './Cart.css';
import { useState, useEffect,useContext } from 'react'; 
import { AuthContext } from '../../global/AuthContext';
import { CartContext } from '../../global/CartContext';
import { apiCartRecord,apiCreatCart,apiUserDetailsRequest,apiOrderDish } from '../../global/api';
export default function Cart() {
    const restaurantName = window.localStorage.getItem("restaurantName")
    const [userContext, setUserContext] = useContext(AuthContext)
    const [cartContext,setCartContext] = useContext(CartContext)
    const [userId,setUserId] = useState("")
    const[cartData,setCartData]= useState({})
    
    //取得user ID
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

    //把訂單所需的資料包成一個物件
    useEffect(() => {
        setCartData({
            userId:userId,
            history:[{
                    restaurantName:restaurantName,
                    dish:cartContext
                }
            ]
        })
    }, [userId,restaurantName,cartContext])

    //更新購物車
    useEffect(() => {
        if( userId !== ""){
            console.log(cartData);
            apiCreatCart(cartData)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            }) 
        }
    }, [cartData])

    //送出訂單給後端
    const handleOrder = () =>{
        apiOrderDish(cartData)
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })

        setCartData({
            userId:userId,
            history:[{
                    restaurantName:restaurantName,
                    dish:[]
                }
            ]
        })
        localStorage.removeItem('cartItems');

    }

    

    return (
        <>
            <Navbar />
            <div className="container cartkv">
                <div className="row">
                    <h5>Shopping Cart</h5>
                    <hr />
                    <CartItem cartData={cartData}/>
                </div>
            </div>
            <div className="container cartsum mb-4">
                <hr />
                <div className="row mb-2">
                    <div className="col-8 backtoshop">
                        <Link to="/Homepage" ><i className="fas fa-arrow-left"></i>&nbsp;Back</Link>
                    </div>
                    {/* <div className="col-4">
                        <span className="text-end">Total Price</span>    
                    </div> */}
                </div>
                <div className="row justify-content-end "> 
                    <div className="col col-md-4 col-sm-8 cartbtn text-end">
                        <button type="button" className="btn btn-outline-dark"  onClick={handleOrder}>check out</button>
                    </div>
                </div>
            </div>
        </>    
    )
}