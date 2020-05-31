import React, { useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';

import { nameByActionType } from 'helpers/actionType';
import useStyles from './WebRTCTestStyles';

function WebRTCTest({ player, isTurn }) {
  const classes = useStyles({ player });
  const dispatch = useDispatch();
  const videoState = useSelector(state => state.data.video);
  const { playerId } = useSelector(state => state.data.playerSession);

  const onClick = () => {
    if (videoState.isConnected) return;
    if (playerId !== player.id) return;

    const onSuccess = () => {
      dispatch({ type: 'INITIALIZE_WEBRTC_SUCCESS' });
      dispatch({ type: 'HANDLE_JOIN_SESSION' });
    };
    const payload = { onSuccess }
    dispatch({ type: 'INITIALIZE_WEBRTC', payload });
  };

  if (!player) return null;

  const remainStack = player.betSize ? player.stack - player.betSize : player.stack;

  return (
    <div className={classNames(classes.container, { [classes.isTurn]: isTurn })} onClick={onClick}>
      <div className={classes.videoContainer}>
        <video id={`video-player-${player.id}`} playsInline autoPlay className={classes.video}></video>
        <span className={classes.nickname}>{player.nickname}</span>
        <span className={classes.status}>
          {!!player.actionType ? (
            <div className={classes.actionType}>{nameByActionType[player.actionType]}</div>
          ) : (player.stack - (player.betSize || 0)) === 0 ? (
            <div className={classes.allin}>オールイン</div>
          ) : (
            <div className={classes.stackSize}>{player.stack - (player.betSize || 0)}</div>
          )}
        </span>
      </div>
    </div>
  );
};

WebRTCTest.propTypes = {
  player: PropTypes.object.isRequired,
  isTurn: PropTypes.bool,
};

WebRTCTest.defaultProps = {
  isTurn: false,
};

export default WebRTCTest;
