import React from 'react';

import Typography from '@material-ui/core/Typography';

import useGameStartCountdown from './hooks/useGameStartCountdown';
import useStyles from './GameStartCountdownStyles';

function GameStartCountdown({ count }) {
  const classes = useStyles();
  const remain = useGameStartCountdown(count);

  return (
    <Typography className={classes.container}>
      次のハンド開始まであと
      <Typography component="span" className={classes.remain}>{remain}</Typography>
      秒
    </Typography>
  )
}

export default GameStartCountdown
