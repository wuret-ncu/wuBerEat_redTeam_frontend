import React from 'react';
import './SignIn.css';
import {Link} from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../AuthContextapi';
import { apiUserRegister } from '../api';

export default function SignIn() { 
    const[userdata,setUserdata]=useState({})//data account password
    const[pending,setpending]=useState(false) //Button pending
    const[userContext,setUserContext] = useContext(AuthContext)
    
//onChange event 帳號密碼input
    const handleChange = (e) => {    
        const{name, value} = e.target;
        setUserdata(prev =>({
            ...prev,
            [name]:value
        }));
    };

    const handleSubmit = (e) =>{
        e.preventDefault();//no refresh
        setpending(true);
        
        //Register API
        apiUserRegister(userdata)
        .then(async response=>{
            const data = await response.data
            setUserContext( prev => {
                return{...prev, token : data.token}
            })
            setpending(false);    
        })
        .catch(err=>{
            setpending(false);
            console.log(err);
        })
    }

    return (  
        <div className="banner"> 
            <div className = "container SignIncontext">
                <div className="row justify-content-md-end justify-content-sm-center">
                    <div className="col col-md-4 col-sm-12">
                        <div className="row">
                            <span className="leftText col col-lg-7">Sign Up</span>
                            <span className="rightText col col-lg-5 text-end"><Link to="/SignIn" >+Sign In</Link></span>
                        </div>
                        <hr className="hr"/> 
                        <form className ="form" onSubmit={handleSubmit}>
                            <div>
                                <input 
                                    type="text" 
                                    name="username" 
                                    className="form-control"  
                                    placeholder="UserName"  
                                    onChange={handleChange}
                                />                       
                            </div>
                            <div>
                                <input 
                                    type="text" 
                                    name="password" 
                                    className="form-control"  
                                    placeholder="password"  
                                    onChange={handleChange}
                                />                       
                            </div>
                            <div>
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    className="form-control"  
                                    placeholder="fristname"  
                                    onChange={handleChange}
                                />                       
                            </div>
                            <div>
                                <input 
                                    type="text" 
                                    name="lastName" 
                                    className="form-control"  
                                    placeholder="lastname"  
                                    onChange={handleChange}
                                />                       
                            </div>
                            {!pending&&<button type="submit" className="btn btn-dark button">Submit</button>}
                            {pending&&<button type="submit" className="btn btn-dark button" disabled>Submitting...</button>}
                        </form>
                    </div>
                </div>        
            </div>
        </div>
    )
}