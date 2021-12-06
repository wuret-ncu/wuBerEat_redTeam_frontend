import React from 'react';
import './SignIn.css';
import {Link} from 'react-router-dom';
import { useState, useContext} from 'react';
import { AuthContext } from '../../global/AuthContextapi';
import { apiUserLogin } from '../../global/api';

export default function SignIn() { 
    const[userdata,setUserdata] = useState({})//data account password
    const[pending,setpending] = useState(false) //Button pending
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
        
        // Login API
        apiUserLogin(userdata)
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
        // var data ={
        //     "username": "3@3",
        //     "password": "test"
        //   }
          
        //   var config = {
        //     method: 'post',
        //     url: 'http://localhost:80/users/login2',
        //     headers: { 
        //       'Content-Type': 'application/json'
        //     },
        //     data : data
        //   };
          
        //   axios(config)
        //   .then(function (response) {
        //     console.log(JSON.stringify(response.data));
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
    }

    return (  
        <div className="banner"> 
            <div className = "container SignIncontext">
                <div className="row justify-content-md-end justify-content-sm-center">
                    <div className="col col-md-4 col-sm-12">
                        <form className ="form" onSubmit={handleSubmit}>
                        <div className="row">
                            <span className="leftText col col-lg-7">Sign In</span>
                            <span className="rightText col col-lg-5 text-end"><Link to="/SignUp" >+Sign Up</Link></span>
                        </div>
                        <hr className="hr"/> 
                            <div>
                                <label htmlFor="username" className="form-label">Username</label>
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
                                    placeholder="Password"  
                                    onChange={handleChange}
                                    required
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