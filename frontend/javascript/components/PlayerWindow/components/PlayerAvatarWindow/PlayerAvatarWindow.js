import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';
import PropTypes from 'prop-types';

import { nameByActionType } from 'helpers/actionType';
import useIsMobile from 'hooks/useIsMobile';

import useStyles from './PlayerAvatarWindowStyles';
import usePlayerAvatarWindow from './hooks/usePlayerAvatarWindow';

const PlayerAvatarWindow = ({ isMe, player, tableId }) => {
  const classes = useStyles();
  const { startAudio, startVideo } = usePlayerAvatarWindow(tableId);

  const { isMobile } = useIsMobile();

  return (
    <div className={classes.videoContainer}>
      {/* プロフィール画像 */}
      {player.profileImageUrl && <img src={player.profileImageUrl} alt={player.name} className={classes.avatar} />}

      {/* プレイヤー名 */}
      <span className={classes.name}>{player.name}</span>

      {/* 自分の場合、WebRTCのコントロールボタン */}
      {isMe && (
        <div className={classes.inner}>
          <Box mb={2}>
            {isMobile ? (
              <Button onClick={startVideo} variant="contained" color="primary">
                <VideocamIcon />
              </Button>
            ) : (
              <Button onClick={startVideo} startIcon={<VideocamIcon />} variant="contained" color="primary">
                ビデオチャット参加
              </Button>
            )}
          </Box>
          {isMobile ? (
            <Button onClick={startAudio} size="small" className={classes.startAudioButton}>
              <MicIcon />
            </Button>
          ) : (
            <Button onClick={startAudio} startIcon={<MicIcon />} size="small" className={classes.startAudioButton}>
              音声のみで参加
            </Button>
          )}
        </div>
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
