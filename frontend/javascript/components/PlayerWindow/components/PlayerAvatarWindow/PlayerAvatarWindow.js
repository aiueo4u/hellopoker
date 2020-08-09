import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';

import { nameByActionType } from 'helpers/actionType';
import { isTouchDevise } from 'utils/devise';
import usePlayerAvatarWindow from './hooks/usePlayerAvatarWindow';
import useStyles from './PlayerAvatarWindowStyles';

const PlayerAvatarWindow = ({ isMe, player, tableId }) => {
  const classes = useStyles();
  const { startAudio, startVideo } = usePlayerAvatarWindow(tableId);

  return (
    <div className={classes.videoContainer}>
      {isMe ? (
        <div className={classes.inner}>
          <Box mb={2}>
            {isTouchDevise ? (
              <Button onClick={startVideo} variant="contained" color="primary">
                <VideocamIcon />
              </Button>
            ) : (
              <Button onClick={startVideo} startIcon={<VideocamIcon />} variant="contained" color="primary">
                ビデオチャット参加
              </Button>
            )}
          </Box>
          {isTouchDevise ? (
            <Button onClick={startAudio} size="small" className={classes.startAudioButton}>
              <MicIcon />
            </Button>
          ) : (
            <Button onClick={startAudio} startIcon={<MicIcon />} size="small" className={classes.startAudioButton}>
              音声のみで参加
            </Button>
          )}
        </div>
      ) : player.imageUrl ? (
        <>
          <img src={player.imageUrl} alt={player.nickname} className={classes.avatar} />
          <span className={classes.nickname}>{player.nickname}</span>
        </>
      ) : (
        <span className={classes.avatar}>{player.nickname}</span>
      )}
      <span className={classes.status}>
        {player.actionType ? (
          <div className={classes.actionType}>{nameByActionType[player.actionType]}</div>
        ) : player.stack - (player.betSize || 0) === 0 ? (
          <div className={classes.allin}>オールイン</div>
        ) : (
          <div className={classes.stackSize}>{player.stack - (player.betSize || 0)}</div>
        )}
      </span>
    </div>
  );
};

PlayerAvatarWindow.propTypes = {
  isMe: PropTypes.bool.isRequired,
  player: PropTypes.object.isRequired,
  tableId: PropTypes.string.isRequired,
};

export default PlayerAvatarWindow;
