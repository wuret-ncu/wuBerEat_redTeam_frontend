import React from 'react';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import RestaurantList from './component/RestaurantList';
import DishList from './component/DishList';
import Footer from '../../components/Footer'; 
import Loader from '../../components/Loader';
import { AuthContext } from '../../global/AuthContext';
import {useCallback, useContext, useEffect,useState} from 'react';
import { apiUserDetailsRequest,apiCartRecord } from '../../global/api';

export default function Homepage() {
    const [userContext, setUserContext] = useContext(AuthContext)
    const [searchValue,setSearchValue] = useState({})
    const [searching,setSearching] = useState(false)
    const [dishShow,setDishShow] = useState(false)
    const [dishData,setDishData] = useState(null)
    const [userId,setUserId] = useState("");
    

    const fetchUserDetails = useCallback(()=>{
        apiUserDetailsRequest({
            headers:{
                Authorization: `Bearer ${userContext.token}`}
        })
        .then(async response =>{
            if(response.statusText === 'OK'){
                //console.log(response);
                const data = await response.data
                setUserId(data._id)
                setUserContext( prevData =>{
                    return{...prevData, details : data}
                })
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
    },[setUserContext, userContext.token])

    useEffect(()=>{
        if(!userContext.details){
            fetchUserDetails()
        }
    },[userContext.details, fetchUserDetails])
    
    //查看是否有購物車紀錄
    useEffect(()=>{
        if( userId !== ""){
            apiCartRecord(userId)
            .then(res=>{
                let cookieValue = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)cart\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
                let historyCart = JSON.parse(cookieValue)
                window.localStorage.setItem("cartItems", JSON.stringify(historyCart.history[0].dish[0]))
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },[userId])

    return  userContext.details === null?(
        "Error Loading"
    ) : !userContext.details ?(
        <Loader />
    ):(
        <>
            <Navbar /> 
            <Header 
                setSearchValue={setSearchValue} 
                setSearching={setSearching} 
            />
            {
                !dishShow?(
                <RestaurantList 
                    searchValue={searchValue} 
                    searching={searching} 
                    setSearching={setSearching} 
                    setDishShow={setDishShow}
                    setDishData={setDishData}
                />
                ):(
                    <DishList dishData={dishData}/>
                )
            }
            
            <Footer />
        </>   
    )
    
}
