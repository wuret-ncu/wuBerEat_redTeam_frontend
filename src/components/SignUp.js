import React from 'react';
import './SignIn.css';
import {Link, useHistory} from 'react-router-dom';
import { useState } from 'react';

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
        console.log(data);
//login request
        fetch('http://127.0.0.1',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body : JSON.stringify(data)
        })
        .then(()=>{
            console.log('success');
        })
        .catch(() =>{
            console.log("123");
            setpending(false);
            history.push('/SignIn')
        })
    }

    return (  
        <div className="banner"> 
            <div className = "container context">
                <div className="row justify-content-md-end justify-content-sm-center">
                    <div className="col col-md-4 col-sm-12">
                        <div className="row">
                            <span className="singintext col col-lg-7">Sign In</span>
                            <span className="singuptext col col-lg-5 text-end"><Link to="/SignIn" >+Sign Up</Link></span>
                        </div>
                        <hr className="hr"/> 
                        <form className ="form" onSubmit={handleSubmit}>
                            <div>
                                <input type="text" name="name" className="form-control"  placeholder="Name"  onChange={handleChange}/>                       
                            </div>
                            <div>
                                <input type="text" name="account" className="form-control"  placeholder="Account"  onChange={handleChange}/>                       
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