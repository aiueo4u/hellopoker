import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { roundToReadable } from 'utils/label';
import useStyles from './TopInfobarStyles';

const TopInfobar = ({ handCount, round }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="caption" className={classes.round}>
        {roundToReadable(round)}
      </Typography>
      <Typography variant="caption" className={classes.handCount}>
        第{handCount}
        ゲーム
      </Typography>
    </div>
  );
};

TopInfobar.propTypes = {
  handCount: PropTypes.number.isRequired,
  round: PropTypes.string,
};

TopInfobar.defaultProps = {
  round: '',
};

export default TopInfobar;
