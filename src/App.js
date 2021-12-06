import React from 'react';
import SignIn from './pages/SignInUp/SignIn';
import SignUp from './pages/SignInUp/SignUp';
import Homepage from './pages/Home/Homepage';
import Cart from './pages/Cart/Cart'
import Record from './pages/Record/Record'
import Edit from './pages/EditMenu/Edit';
import Loader from './pages/Loader';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import {useEffect, useContext, useCallback } from 'react';
import { AuthContext } from './global/AuthContextapi';
import { apiUserRefreshToken } from './global/api';

function App() {
  const[userContext, setUserContext] = useContext(AuthContext);

    //useCallback to avoid re-declaration when component re-renders
    const verifyUser = useCallback(()=>{
      //RefreshToken API
      apiUserRefreshToken(null,{
        headers:{Authorization: `Bearer ${userContext.token}`}
      })
      .then( async res =>{
        console.log(res);
        if(res.statusText === 'OK'){
          const data = await res.json()
          setUserContext( prevData =>{
            return{...prevData, token : data.token} 
          })
        } else{
          setUserContext( prevData => {
            return{...prevData, token : null}
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
          <Loader />
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
          <Loader />
        )
      }
    />
  );
};

export default App;