import React from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Homepage from './pages/Homepage';
import Cart from './pages/Cart';
import Record from './pages/Record';
import Edit from './pages/Edit';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import {useEffect, useContext, useCallback } from 'react';
import { AuthContext } from './AuthContextapi';
import { apiUserRefreshToken } from './api';

function App() {
  const[userContext, setUserContext] = useContext(AuthContext);
  
  const verifyUser = useCallback(()=>{
    //RefreshToken API
    apiUserRefreshToken({
      headers:{Authorization: `Bearer ${userContext.token}`}
  })
    .then( async res =>{
      if(res.ok){
        const data = await res.json()
        setUserContext( prev =>{
          return{...prev, token : data.token} 
        })
      } else{
        setUserContext( prev => {
          return{...prev, token : null}
        })
      }
      setTimeout(verifyUser, 5 * 60 * 1000)
    })
  },[setUserContext])

  useEffect(()=>{
    verifyUser()
  },[verifyUser])

  const synclogout = useCallback(event=>{
    if(event.key === "logout"){
      window.location.reload()
    }
  },[])

  useEffect(() => {
    window.addEventListener("storage", synclogout)
    return () => {
      window.removeEventListener("storage", synclogout)
    }
  },[synclogout])

  return (
    <>     
      <Router>
        <Switch>
          <ProtectedLogin path="/SignIn" auth={userContext} component={SignIn} />
          <ProtectedLogin path="/SignUp" auth={userContext} component={SignUp} />
          <ProtectedRoute path="/Homepage" auth={userContext} component={Homepage} />
          <ProtectedRoute path="/Cart" auth={userContext} component={Cart} />
          <ProtectedRoute path="/Record" auth={userContext} component={Record} />
          <ProtectedRoute path="/Edit" auth={userContext} component={Edit} />
        </Switch>
      </Router>
    </>
  );
}

//protect Login
const ProtectedLogin = ({auth,component:Component, ...rest}) =>{
  return(
    <Route 
    {...rest} 
      render ={()=> !auth.token ? (
        <Component />
        ):auth.token?
        (
          <Redirect to ="/Homepage" />
        ):(
          console.log("loading page")
        )
      }
    />
  );
};

//protect route
const ProtectedRoute = ({auth,component:Component, ...rest}) =>{
  return(
    <Route 
    {...rest} 
      render ={()=> auth.token? (
        <Component />
        ): !auth.token ?
        (
          <Redirect to ="/SignIn" />
        ):(
          console.log("loading page")
        )
      }
    />
  );
};

export default App;