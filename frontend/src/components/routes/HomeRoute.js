import React, { useEffect } from 'react'
const { Route } = require('react-router-dom')

const HomeRoute = ({ component: Component, setPageTitle, title, ...rest }) => {
  useEffect(() => {
    setPageTitle(title)
  }, [setPageTitle, title]);

  return (
    <Route
      {...rest}
      render={(props) => (
        <Component {...props} />
      )}
    />
  )
}

export default HomeRoute;