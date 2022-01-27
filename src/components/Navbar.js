import React from 'react';
import './Navbar.css';
import { useState, useEffect, useContext} from 'react';
import { AuthContext } from '../global/AuthContext';
import { apiUserLogout} from '../global/api';
import { CartContext } from '../global/CartContext';

export default function Navbar() {
    const [moveNav, setmoveNav] = useState(0)
    const [userContext, setUserContext] = useContext(AuthContext)
    
    //Cart count
    const [cartItems] = useContext(CartContext)
    //Loop through the items and find the total count
    const totalCount = cartItems.reduce(
        //之前的值 + 現在處理的元素 => 舊值 + 新值 ， 0 是設定初始值
        (prevValue, currentValue) => prevValue + currentValue.count,
        0
    )

    //Logout
    const handlerLogout = () => {
        apiUserLogout({headers:{Authorization: `Bearer ${userContext.token}`}})
        .then(async res => {
            console.log(res);
            setUserContext(prev =>{
                return{...prev, datails:undefined , token:null}
            })
            window.localStorage.setItem("logout",Date.now())
        })
    }

    //navbar hide &show
    useEffect(()=>{
        var lastScrollTop = 0;
        const handleScroll = () => {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          if(scrollTop > lastScrollTop){
            setmoveNav(-216)
          }
          else{
            setmoveNav(0)
          }
          lastScrollTop = scrollTop;
        }
        window.addEventListener('scroll', handleScroll, {passive:true});
        return ()=>
        window.removeEventListener('scroll', handleScroll)
      },[])

    return (
        <nav style={{top:moveNav}} className="navbar navbar-expand-lg navbar-dark" >
            <div className="container-fluid">
                <span className="navbar-brand">WuberEat</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">                        
                <a href="/#" className="navbar-toggler-icon"> </a>
                </button>
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/Homepage">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Edit"><i className="far fa-user"></i></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Record">
                                <i className="far fa-file-alt"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Cart">
                                <i className="far fa-shopping-cart"></i> 
                                {totalCount > 0 && <span className="cart_count">{totalCount}</span>}
                            </a>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" onClick={handlerLogout}>Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
