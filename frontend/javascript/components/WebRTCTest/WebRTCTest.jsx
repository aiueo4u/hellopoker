import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';

import useStyles from './WebRTCTestStyles';

function WebRTCTest({ player, local }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const videoState = useSelector(state => state.data.video);

  const onClick = () => {
    if (videoState.isConnected) return;

    const onSuccess = () => {
      dispatch({ type: 'INITIALIZE_WEBRTC_SUCCESS' });
      dispatch({ type: 'HANDLE_JOIN_SESSION' });
    };
    const payload = { onSuccess }
    dispatch({ type: 'INITIALIZE_WEBRTC', payload });
  };

  if (!player) return null;

  return (
    <div className={classes.container} onClick={onClick}>
      <video id={`video-player-${player.id}`} playsInline autoPlay className={classes.video}></video>
    </div>
  );
};

export default WebRTCTest;
