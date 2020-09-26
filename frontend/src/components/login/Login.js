import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActions, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import TextField from '../common/BasicTextField';
import Button from '../common/BasicButton';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaeaea'
  },
  cardActions: {
    flexDirection: 'row-reverse',
    margin: '8px 16px'
  }
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const locState = location.state || {};

  /* Handle redirect error message */
  useEffect(() => {
    if (locState.errorMessage) {
      setSnackBarError(locState.errorMessage);
    }
  }, []);


  /* Login handling */
  const [account, setAccount] = useState({
    username: '',
    password: ''
  })
  const [errorStatus, setErrorStatus] = useState({
    username: '',
    password: ''
  })
  const [snackBarError, setSnackBarError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!errorStatus.username && !errorStatus.password) {
      Axios.post('/api/auth/login', {
        username: account.username,
        password: account.password
      })
        .then((data) => {
          history.push(locState.from || '/home')
        })
        .catch((error = {}) => {
          const errorMessage = error.response && (error.response.data || error.message);
          setSnackBarError(errorMessage)
          console.log(error)
        })
    }
  }

  const onChangeField = (value, fieldId) => {
    setAccount((account) => ({ ...account, [fieldId]: value }))
    const errorMessage = !value ? `${fieldId} wajib diisi.` : '';
    setErrorStatus((error) => ({
      ...error,
      [fieldId]: errorMessage
    }))
    setSnackBarError('');
  }

  return (
    <div className={classes.root}>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Welcome!
            </Typography>
            <TextField
              id="username"
              label="Username"
              value={account.username}
              onChange={(e) => onChangeField(e.target.value, 'username')}
              required
              error={Boolean(errorStatus.username)}
              helperText={errorStatus.username}
            />
            <TextField
              id="password"
              label="Password"
              value={account.password}
              onChange={(e) => onChangeField(e.target.value, 'password')}
              type="password"
              autoComplete="current-password"
              required
              error={Boolean(errorStatus.password)}
              helperText={errorStatus.password}
            />
            {snackBarError && <Alert severity="error">{snackBarError}</Alert>}
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button type="submit">
              Login
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  )
}

export default Login;
