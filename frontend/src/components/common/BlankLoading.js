import React from 'react'
import { CircularProgress } from '@material-ui/core';

const BlankLoading = () => (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress size={80} />
    </div>
)

export default BlankLoading;
