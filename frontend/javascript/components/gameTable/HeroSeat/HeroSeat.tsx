import * as React from 'react';

import { EmptySeat } from 'components/EmptySeat';
import PlayerActions from 'components/PlayerActions';
import HeroPlayerPanel from 'components/gameTable/HeroPlayerPanel';
import useGameTableState from 'hooks/useGameTableState';
import useIsMobile from 'hooks/useIsMobile';

import { useStyles } from './HeroSeatStyles';

export const HeroSeat = ({ player, tableId }: { player: any; tableId: string }) => {
  const classes = useStyles();
  const { tournament } = useGameTableState();
  const { isMobile } = useIsMobile();

  return (
    <div className={classes.container}>
      {player.id ? (
        <>
          <HeroPlayerPanel player={player} tableId={tableId} />
          {!isMobile && <PlayerActions player={player} tableId={tableId} />}
        </>
      ) : !tournament ? (
        <EmptySeat tableId={tableId} seatNo={player.seatNo} />
      ) : null}
    </div>
  );
};
