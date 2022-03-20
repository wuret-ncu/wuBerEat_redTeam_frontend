import React from 'react';
import SignIn from './pages/SignInUp/SignIn';
import SignUp from './pages/SignInUp/SignUp';
import Homepage from './pages/Home/Homepage';
import Cart from './pages/Cart/Cart'
import Record from './pages/Record/Record'
import Editpage from './pages/EditMenu/Editpage';
import Loader from './components/Loader';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import {useEffect, useContext, useCallback } from 'react';
import { AuthContext } from './global/AuthContext';
import { apiUserRefreshToken} from './global/api';

function App() {
  const[userContext, setUserContext] = useContext(AuthContext);
    //useCallback 避免 Component re-render 時重新宣告，
    //verifyUser() 放在 useEffect  的依賴值裡，function 在 JS 裡視為物件，物件或是陣列等
    //是看記憶體位址，基本上都會視為不相同，因此會一直重新宣告verifyUser()
    const verifyUser = useCallback(()=>{
      //RefreshToken API
      apiUserRefreshToken()
      .then( async res =>{
        if(res.statusText === 'OK'){
          const data = await res.data
          setUserContext( prevData =>{
            return{...prevData, token : data.token} 
          })
        }
        setTimeout(verifyUser, 5 * 60 * 1000)
      })
      .catch(err=>{
        console.log(err);
          setUserContext( prevData => {
            return{...prevData, token : null}
          })
      })
  },[setUserContext])

  useEffect(()=>{
    verifyUser()
  },[verifyUser])

  //登出
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
    <Router>
      <Switch>
        <ProtectedLogin exact path="/" auth={userContext} component={SignIn} />
        <ProtectedLogin path="/SignUp" auth={userContext} component={SignUp} />
        <ProtectedRoute path="/Homepage" auth={userContext} component={Homepage} />
        <ProtectedRoute path="/Cart" auth={userContext} component={Cart} />
        <ProtectedRoute path="/Record" auth={userContext} component={Record} />
        <ProtectedRoute path="/Edit" auth={userContext} component={Editpage} />
      </Switch>
    </Router>
  );
}

//protect Login
const ProtectedLogin = ({auth,component:Component, ...rest}) =>{
  return(
    <Route 
    {...rest} 
      render ={()=> auth.token === null ? (
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
        ): auth.token === null ?
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