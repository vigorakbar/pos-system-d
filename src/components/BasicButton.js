import React from 'react';
import { Button } from '@material-ui/core';

const BasicButton = ({ variant = 'contained', color = 'primary', ...rest }) => (
  <Button
    variant={variant}
    color={color}
    {...rest}
  />
);

export default BasicButton;
