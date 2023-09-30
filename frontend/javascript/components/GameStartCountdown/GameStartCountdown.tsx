import * as React from 'react';

import Typography from '@material-ui/core/Typography';

import { useGameStartCountdown } from './hooks/useGameStartCountdown';
import { useGameStartCountdownStyles } from './hooks/useGameStartCountdownStyles';

type Props = { count: number };

export const GameStartCountdown = ({ count }: Props) => {
  const classes = useGameStartCountdownStyles();
  const remain = useGameStartCountdown({ count });

  return (
    <Typography className={classes.container}>
      次のハンド開始まであと
      <Typography component="span" className={classes.remain}>
        {remain}
      </Typography>
      秒
    </Typography>
  );
};
