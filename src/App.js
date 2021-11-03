import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Homepage from './pages/Homepage';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import Cart from './pages/Cart';
import Record from './pages/Record';


function App() {
  return (
    <div >
      <BrowserRouter>
        <Switch>
          <Route path="/SignIn">
            <SignIn />
          </Route>
          <Route path="/SignUp">
            <SignUp />
          </Route> 
          <Route path="/Homepage">
            <Homepage />
          </Route>
          <Route path="/Cart">
            <Cart />
          </Route>
          <Route path="/Record">
            <Record />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;