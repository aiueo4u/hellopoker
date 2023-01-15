import * as React from 'react';

import classNames from 'classnames';

import { GamePlayer } from 'services/domain/player';

import { useStyles } from './PlayerWindowStyles';
import { PlayerAvatarWindow } from './components/PlayerAvatarWindow';

export const PlayerWindow = ({ player, isTurn = false }: { player: GamePlayer; isTurn?: boolean }) => {
  const classes = useStyles({ player });

  return (
    <div className={classNames(classes.container, { [classes.isTurn]: isTurn })}>
      <PlayerAvatarWindow player={player} />
    </div>
  );
};
