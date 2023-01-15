import * as React from 'react';

import CentralCard from 'components/CentralCard';
import PlayerChipBetArea from 'components/PlayerChipBetArea';

import { useStyles } from './GameTableStyles';

export const GameTable = ({ heroPositionPlayer = null }: { heroPositionPlayer: any }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CentralCard />
      <div className={classes.playerChipBetArea}>
        <PlayerChipBetArea player={heroPositionPlayer} />
      </div>
    </div>
  );
};
