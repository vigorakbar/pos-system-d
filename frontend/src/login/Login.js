import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActions, Typography } from '@material-ui/core';
import TextField from '../components/BasicTextField';
import Button from '../components/BasicButton';

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
  const [account, setAccount] = useState({
    username: '',
    password: ''
  })
  const [errorStatus, setErrorStatus] = useState({
    username: '',
    password: ''
  })

  const onSubmit = (e) => {
    e.preventDefault()
    if (!errorStatus.username && !errorStatus.password) {
      axios.post('http://localhost:3001/api/auth/login', {
        username: account.username,
        password: account.password
      }).then((data) => console.log(data))
    }
  }

  const onChangeField = (value, fieldId) => {
    setAccount((account) => ({ ...account, [fieldId]: value }))
    const errorMessage = !value ? `${fieldId} wajib diisi.` : '';
    setErrorStatus((error) => ({
      ...error,
      [fieldId]: errorMessage
    }))
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
