import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './components/login/Login';
import PrivateRoute from './components/common/PrivateRoute';
import Test from './components/test/Test';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Login} />
        <PrivateRoute path='/test' component={Test} />
      </Switch>
    </div>
  );
}

export default App;
