import * as React from 'react';

import classNames from 'classnames';

import { EmptySeat } from 'components/EmptySeat';
import PlayerPanel from 'components/PlayerPanel';
import useGameTableState from 'hooks/useGameTableState';

import { useStyles } from './PlayerSeatStyles';

export const PlayerSeat = ({ player, position, tableId }: { player: any; position: number; tableId: string }) => {
  const classes = useStyles({ position });
  const { tournament } = useGameTableState();

  if (player.id) {
    return (
      <div className={classNames(classes.base, classes.playerContainer)}>
        <PlayerPanel player={player} tableId={tableId} position={position} />
      </div>
    );
  }
  if (!tournament) {
    return (
      <div className={classNames(classes.base, classes.playerContainer)}>
        <EmptySeat tableId={tableId} seatNo={player.seatNo} />
      </div>
    );
  }

  return null;
};
