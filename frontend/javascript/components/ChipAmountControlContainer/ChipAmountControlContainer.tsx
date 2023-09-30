import * as React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import useBetAction from 'hooks/useBetAction';
import usePlayerSessionState from 'hooks/usePlayerSessionState';
import { usePlayersState } from 'hooks/usePlayersState';

import { useChipAmountControlContainerStyles } from './hooks/useChipAmountControlContainerStyles';

type Props = {
  betButton: React.ReactNode;
  resetButton: React.ReactNode;
  closeButton: React.ReactNode;
};

export const ChipAmountControlContainer = ({ betButton, resetButton, closeButton }: Props) => {
  const classes = useChipAmountControlContainerStyles();
  const players = usePlayersState();
  const session = usePlayerSessionState();
  const player = players.find(p => p.id === session.playerId);

  const { allinBetAmount, increment, oneThirdPotAmount, potBetAmount, setBetAmount } = useBetAction(player);

  return (
    <Box className={classes.container}>
      <Grid container spacing={1}>
        <Grid item>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={() => setBetAmount(oneThirdPotAmount)}
            disabled={oneThirdPotAmount < player.minBetAmount}
          >
            1 / 3 pot
          </Button>
        </Grid>
        <Grid item>
          <Button className={classes.button} variant="outlined" onClick={() => potBetAmount(1 / 2)}>
            1 / 2 pot
          </Button>
        </Grid>
        <Grid item>
          <Button className={classes.button} variant="outlined" onClick={() => potBetAmount(2 / 3)}>
            2 / 3 pot
          </Button>
        </Grid>
        <Grid item>
          <Button className={classes.button} variant="outlined" onClick={() => allinBetAmount()}>
            Max
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item>
          <Button startIcon="+" className={classes.button} variant="outlined" onClick={() => increment(100)}>
            100
          </Button>
        </Grid>
        <Grid item>
          <Button startIcon="+" className={classes.button} variant="outlined" onClick={() => increment(500)}>
            500
          </Button>
        </Grid>
        <Grid item>
          <Button startIcon="+" className={classes.button} variant="outlined" onClick={() => increment(1000)}>
            1000
          </Button>
        </Grid>
        <Grid item>
          <Button startIcon="+" className={classes.button} variant="outlined" onClick={() => increment(5000)}>
            5000
          </Button>
        </Grid>
      </Grid>
      <Box mt={2} display="flex" justifyContent="flex-end">
        {closeButton}
        {resetButton}
        {betButton}
      </Box>
    </Box>
  );
};
