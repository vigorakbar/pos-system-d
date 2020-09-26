import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Route, Redirect } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    Axios.get('/api/users/current')
      .then((data) => {
        setLoggedInUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.response.data || error.message);
        setIsLoading(false);
      })
  }, []);

  const loadingComponent = () => (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress size={80} />
    </div>
  );
  

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) return loadingComponent();
        if (loggedInUser) return <Component {...props} loggedInUser={loggedInUser} />
        return (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location, errorMessage }
            }}
          />
        );
      }}
    />
  )
}

export default PrivateRoute
