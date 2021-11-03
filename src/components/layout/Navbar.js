import React from 'react';
import './Navbar.css';
import { useState, useEffect } from 'react';


export default function Navbar() {
    const [moveNav, setmoveNav] = useState(0)
     
    useEffect(()=>{
        var lastScrollTop = 0;
        //navbar hide &show
        const handleScroll = () => {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          if(scrollTop > lastScrollTop){
            setmoveNav(-60)
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
                <a className="navbar-brand" href="/#">WuberEat</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">                        
                <a href="/#" className="navbar-toggler-icon"> </a>
                </button>
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#"><i className="far fa-user"></i> </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#"><i className="fas fa-shopping-cart"></i> </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
