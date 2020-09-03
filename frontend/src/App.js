import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './login/Login';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' component={Login} />
      </Switch>
    </div>
  );
}

export default App;
