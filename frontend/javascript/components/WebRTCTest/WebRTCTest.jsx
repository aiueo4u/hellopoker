import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

import styles from './WebRTCTestStyles';

const useStyles = makeStyles(styles);

function WebRTCTest({ player, local }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'INITIALIZE_WEBRTC' });
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <Button onClick={() => dispatch({ type: 'HANDLE_JOIN_SESSION' })}>Join</Button>
      <Button onClick={() => dispatch({ type: 'HANDLE_LEAVE_SESSION' })}>Leave</Button>
      {local ? (
        <video id='local-video' autoPlay playsInline className={classes.video}></video>
      ) : (
        <video id={`video-player-${player.id}`} playsInline autoPlay className={classes.video}></video>
      )}
    </div>
  );
};

export default WebRTCTest;
