import React from 'react';
//import PropTypes from 'prop-types';

import CentralCard from './components/CentralCard';
import PlayerChipBetArea from './components/PlayerChipBetArea';

import useStyles from './GameTableStyles';

const GameTable = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CentralCard />
      <div className={classes.playerChipBetArea}>
        <PlayerChipBetArea />
      </div>
    </div>
  );
};

GameTable.propTypes = {};

export default GameTable;
