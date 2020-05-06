import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

import usePlayersState from 'hooks/usePlayersState';
import usePlayerSessionState from 'hooks/usePlayerSessionState';

import useChipAmountControlContainer from './hooks/useChipAmountControlContainer';
import styles from './ChipAmountControlContainerStyles';

const useStyles = makeStyles(styles);

const ChipAmountControlContainer = () => {
  const classes = useStyles();
  const players = usePlayersState();
  const session = usePlayerSessionState();
  const player = players.find(player => player.id === session.playerId)

  const increment = useChipAmountControlContainer(player);

  return (
    <div className={classes.container}>
      <div>
        <Button startIcon="+" className={classes.button} variant="outlined" onClick={() => increment(25)}>
          25
        </Button>
      </div>
      <div>
        <Button startIcon="+" className={classes.button} variant="outlined" onClick={() => increment(100)}>
          100
        </Button>
      </div>
      <div>
        <Button startIcon="+" className={classes.button} variant="outlined" onClick={() => increment(500)}>
          500
        </Button>
      </div>
    </div>
  );
};

export default ChipAmountControlContainer;
