import React from 'react';
import './SignIn.css';
import {Link} from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../global/AuthContextapi';
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
                                <label htmlFor="Username" className="form-label">Username</label>
                                <input 
                                    type="email" 
                                    name="Username" 
                                    className="form-control"  
                                    placeholder="UserName"  
                                    onChange={handleChange}
                                />                       
                            </div>
                            <div>
                                <label htmlFor="Password" className="form-label">Password</label>
                                <input 
                                    type="text" 
                                    name="Password" 
                                    className="form-control"  
                                    placeholder="password"  
                                    onChange={handleChange}
                                />                       
                            </div>
                            <div>
                                <label htmlFor="FirstName" className="form-label">FirstName</label>
                                <input 
                                    type="text" 
                                    name="FirstName" 
                                    className="form-control"  
                                    placeholder="fristname"  
                                    onChange={handleChange}
                                />                       
                            </div>
                            <div>
                                <label htmlFor="LastName" className="form-label">LastName</label>
                                <input 
                                    type="text" 
                                    name="LastName" 
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