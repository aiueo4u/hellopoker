import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import { nameByActionType } from 'helpers/actionType';

import PlayerAvatarWindow from './components/PlayerAvatarWindow';
import usePlayerWindow from './hooks/usePlayerWindow';
import useStyles from './PlayerWindowStyles';

const PlayerWindow = ({ player, isTurn, tableId }) => {
  const videoState = useSelector(state => state.webRTC);
  const { playerId } = useSelector(state => state.data.playerSession);
  const { enableAudio, disableAudio, enableVideo, disableVideo, isActiveStream } = usePlayerWindow(player);
  const classes = useStyles({ player });

  if (!player) return null;

  const isMe = playerId === player.id;

  return (
    <div className={classNames(classes.container, { [classes.isTurn]: isTurn })}>
      {isActiveStream ? (
        <div className={classes.videoContainer}>
          <video id={`video-player-${player.id}`} playsInline autoPlay className={classes.video} />
          {!videoState.isVideoEnabledByPlayerId[player.id] && player.profileImageUrl && (
            <img src={player.profileImageUrl} alt={player.name} className={classes.avatar} />
          )}
          <span className={classes.name}>{player.name}</span>
          <span className={classes.status}>
            {player.actionType ? (
              <div className={classes.actionType}>{nameByActionType[player.actionType]}</div>
            ) : player.stack - (player.betSize || 0) === 0 ? (
              <div className={classes.allin}>オールイン</div>
            ) : (
              <div className={classes.stackSize}>{player.stack - (player.betSize || 0)}</div>
            )}
          </span>
          {isMe && (
            <div className={classes.inner}>
              <Box mb={2}>
                {videoState.isVideoEnabledByPlayerId[player.id] ? (
                  <Button className={classes.micSwitchButton} startIcon={<VideocamIcon />} onClick={disableVideo}>
                    ビデオをOFFにする
                  </Button>
                ) : (
                  <Button className={classes.micSwitchButton} startIcon={<VideocamOffIcon />} onClick={enableVideo}>
                    ビデオをONにする
                  </Button>
                )}
              </Box>
              {videoState.isAudioEnabledByPlayerId[player.id] ? (
                <Button className={classes.micSwitchButton} startIcon={<MicIcon />} onClick={disableAudio}>
                  マイクをOFFにする
                </Button>
              ) : (
                <Button className={classes.micSwitchButton} startIcon={<MicOffIcon />} onClick={enableAudio}>
                  マイクをONにする
                </Button>
              )}
            </div>
          )}
          {!videoState.isAudioEnabledByPlayerId[player.id] && <MicOffIcon className={classes.micOffIcon} />}
        </div>
      ) : (
        <PlayerAvatarWindow tableId={tableId} player={player} isMe={isMe} />
      )}
    </div>
  );
};

PlayerWindow.propTypes = {
  player: PropTypes.object.isRequired,
  isTurn: PropTypes.bool,
  tableId: PropTypes.string.isRequired,
};

PlayerWindow.defaultProps = {
  isTurn: false,
};

export default PlayerWindow;
