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
import Edit from './pages/Edit';


function App() {
  return (
    <div >
      <BrowserRouter>
        <Switch>
          <Route path="/SignIn" component={SignIn} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/Homepage" component={Homepage} />
          <Route path="/Cart" component={Cart} />
          <Route path="/Record" component={Record} />
          <Route path="/Edit" component={Edit} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;