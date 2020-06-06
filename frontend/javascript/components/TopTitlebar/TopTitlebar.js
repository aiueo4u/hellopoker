import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import useStyles from './TopTitlebarStyles';

const TopTitlebar = ({ gameTable }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="caption" className={classes.title}>
        {gameTable.table.name}
      </Typography>
    </div>
  );
};

TopTitlebar.propTypes = {
  gameTable: PropTypes.object.isRequired,
};

export default TopTitlebar;
