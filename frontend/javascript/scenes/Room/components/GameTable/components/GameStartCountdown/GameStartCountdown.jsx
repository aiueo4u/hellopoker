import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import useGameStartCountdown from './hooks/useGameStartCountdown';
import styles from './GameStartCountdownStyles';

const useStyles = makeStyles(styles);

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
