import React from 'react';
import PropTypes from 'prop-types';

import CentralCard from './components/CentralCard';
import PlayerChipBetArea from './components/PlayerChipBetArea';

import useStyles from './GameTableStyles';

const GameTable = ({ heroPositionPlayer }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CentralCard />
      <div className={classes.playerChipBetArea}>
        <PlayerChipBetArea player={heroPositionPlayer} />
      </div>
    </div>
  );
};

GameTable.propTypes = {
  heroPositionPlayer: PropTypes.object,
};

GameTable.defaultProps = {
  heroPositionPlayer: null,
};

export default GameTable;
