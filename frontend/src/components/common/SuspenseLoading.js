import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    display: "flex",
    justifyContent: 'center',
    margin: "64px 0",
    width: "100%"
  },
}));

const SuspenseLoading = () => {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
}

export default SuspenseLoading;
