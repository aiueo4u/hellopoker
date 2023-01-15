import * as React from 'react';

import { nameByActionType } from 'helpers/actionType';
import { GamePlayer } from 'services/domain/player';

import { useStyles } from './PlayerAvatarWindowStyles';

export const PlayerAvatarWindow = ({ player }: { player: GamePlayer }) => {
  const classes = useStyles();

  return (
    <div className={classes.videoContainer}>
      {/* プロフィール画像 */}
      {player.profileImageUrl && <img src={player.profileImageUrl} alt={player.name} className={classes.avatar} />}

      {/* プレイヤー名 */}
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
    </div>
  );
};
