import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import useGameStartCountdown from './hooks/useGameStartCountdown';
import useStyles from './GameStartCountdownStyles';

const GameStartCountdown = ({ count }) => {
  const classes = useStyles();
  const remain = useGameStartCountdown(count);

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

GameStartCountdown.propTypes = {
  count: PropTypes.number.isRequired,
};

export default GameStartCountdown;
