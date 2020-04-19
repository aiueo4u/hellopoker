import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const CustomCircularProgress = () => (
  <div style={{ height: '100%', position: 'relative' }}>
    <div
      style={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        margin: 'auto',
        textAlign: 'center',
      }}
    >
      <CircularProgress thickness={4} size={40} />
    </div>
  </div>
);

export default CustomCircularProgress;
