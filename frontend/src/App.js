import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import Login from './components/login/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import BlankLoading from './components/common/BlankLoading';
import Home from './components/home/Home';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await Axios.get('/api/csrf-token');
      Axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
      setIsLoading(false)
     };
    getCsrfToken();
  }, [])

  return (
    <div className="App">
      {isLoading ?
        <BlankLoading />
      : (
        <Switch>
          <Route exact path='/' component={Login} />
          <PrivateRoute path='/home' component={Home} />
        </Switch>
      )}
    </div>
  );
}

export default App;
