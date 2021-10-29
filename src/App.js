import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Homepage from './components/Homepage';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import Cart from './components/Cart';


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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;