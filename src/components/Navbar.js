import React from 'react';
import './Navbar.css';
import { useState, useEffect, useContext} from 'react';
import { AuthContext } from '../global/AuthContextapi';
import { apiUserLogout, apiUserRefreshToken} from '../global/api';

export default function Navbar() {
    const [moveNav, setmoveNav] = useState(0)
    const [userContext, setUserContext] = useContext(AuthContext)

    //Logout
    const handlerLogout = () => {
        var axios = require('axios');

    var config = {
    method: 'post',
    url: 'http://localhost:80/users/refreshToken',
    headers: { 
        withCredentials: true 
        }
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(config);
    console.log(error);
    });
        // apiUserLogout({headers:{Authorization: `Bearer ${userContext.token}`}})
        // .then(async res => {
        //     setUserContext(prev =>{
        //         return{...prev, datails:undefined , token:null}
        //     })
        //     window.localStorage.setItem("logout",Date.now())
        // })
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
                            <a className="nav-link active" aria-current="page" href="/#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#"><i className="far fa-user"></i> {userContext.details.firstName}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#"><i className="fas fa-shopping-cart"></i> </a>
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
