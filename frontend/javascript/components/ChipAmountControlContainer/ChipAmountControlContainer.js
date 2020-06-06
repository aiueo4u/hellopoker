import React from 'react';

import Button from '@material-ui/core/Button';

import usePlayersState from 'hooks/usePlayersState';
import usePlayerSessionState from 'hooks/usePlayerSessionState';

import useChipAmountControlContainer from './hooks/useChipAmountControlContainer';
import useStyles from './ChipAmountControlContainerStyles';

const ChipAmountControlContainer = () => {
  const classes = useStyles();
  const players = usePlayersState();
  const session = usePlayerSessionState();
  const player = players.find(player => player.id === session.playerId);

  const increment = useChipAmountControlContainer(player);

  return (
    <>
      <Button startIcon="+" className={classes.button} variant="outlined" onClick={() => increment(25)}>
        25
      </Button>
      <Button startIcon="+" className={classes.button} variant="outlined" onClick={() => increment(100)}>
        100
      </Button>
      <Button startIcon="+" className={classes.button} variant="outlined" onClick={() => increment(500)}>
        500
      </Button>
    </>
  );
};

export default ChipAmountControlContainer;
