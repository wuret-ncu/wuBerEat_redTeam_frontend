import React from 'react';
import './SignIn.css';
import {Link} from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../global/AuthContext';
import { apiUserRegister } from '../../global/api';

export default function SignIn() { 
    const[userdata,setUserdata]=useState({})//data account password
    const[pending,setpending]=useState(false) //Button pending
    const[userContext,setUserContext] = useContext(AuthContext)
    
//onChange event 帳號密碼input
    const handleChange = (e) => {    
        const{name, value} = e.target;
        setUserdata(prevData =>({
            ...prevData,
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
            setUserContext( prevData => {
                return{...prevData, token : data.token}
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
                        <form className ="form" onSubmit={handleSubmit}>
                        <div className="row">
                            <span className="leftText col col-lg-7">Sign Up</span>
                            <span className="rightText col col-lg-5 text-end"><Link to="/SignIn" >+Sign In</Link></span>
                        </div>
                        <hr className="hr"/> 
                            <div>
                                <label htmlFor="username" className="form-label">Account</label>
                                <input 
                                    type="email" 
                                    name="username" 
                                    id="username"
                                    className="form-control"  
                                    placeholder="Account"  
                                    onChange={handleChange}
                                    required
                                />                       
                            </div>
                            <div>
                                <label htmlFor="password" className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password"
                                    className="form-control"  
                                    placeholder="password"  
                                    onChange={handleChange}
                                    required
                                />                       
                            </div>
                            <div>
                                <label htmlFor="firstName" className="form-label">FirstName</label>
                                <input 
                                    type="text" 
                                    name="firstName"
                                    id="firstName" 
                                    className="form-control"  
                                    placeholder="fristname"  
                                    onChange={handleChange}
                                    required
                                />                       
                            </div>
                            <div>
                                <label htmlFor="lastName" className="form-label">LastName</label>
                                <input 
                                    type="text" 
                                    name="lastName"
                                    id="lastName"
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