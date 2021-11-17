import React from 'react';
import './SignIn.css';
import {Link, useHistory} from 'react-router-dom';
import { useState,useEffect} from 'react';
import { apiUserLogin } from '../api';

export default function SignIn() { 
    const[data,setdata]=useState({})//data account password
    const[pending,setpending]=useState(false) //Button pending
    const history = useHistory();

//onChange event 帳號密碼input
    const handleChange = (e) => {    
        const{name, value} = e.target;
        setdata(prev =>({
            ...prev,
            [name]:value
        }));
    };

    const handleSubmit = (e) =>{
        e.preventDefault();//no refresh
        setpending(true);
        // console.log(data);
        
        //apiUserLogin
        apiUserLogin(data)
        .then(res=>{
            console.log("success");
            console.log(res.data);
            // history.push('/Homepage')
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
                            <span className="leftText col col-lg-7">Sign In</span>
                            <span className="rightText col col-lg-5 text-end"><Link to="/SignUp" >+Sign Up</Link></span>
                        </div>
                        <hr className="hr"/> 
                        <form className ="form" onSubmit={handleSubmit}>
                            <div>
                                <input type="text" name="email" className="form-control"  placeholder="Account"  onChange={handleChange}/>                        
                            </div>
                            <div>
                                <input type="password" name="password" className="form-control" placeholder="Password"  onChange={handleChange}/>
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