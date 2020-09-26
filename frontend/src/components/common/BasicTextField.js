import React from 'react';
import { TextField } from '@material-ui/core';

function BasicTextField({ varian = 'outlined', margin = 'normal', fullWidth = true, ...rest }) {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth={fullWidth}
      {...rest}
    />
  );
}

export default BasicTextField;
