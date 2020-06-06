import React from 'react';
import PropTypes from 'prop-types';

import EmptySeat from 'components/EmptySeat';
import HeroPlayerPanel from '../GameTable/components/HeroPlayerPanel';

import useStyles from './HeroSeatStyles';

const HeroSeat = ({ player, tableId }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {player.id ? (
        <HeroPlayerPanel player={player} tableId={tableId} />
      ) : (
        <EmptySeat tableId={tableId} seatNo={player.seatNo} />
      )}
    </div>
  );
};

HeroSeat.propTypes = {
  player: PropTypes.object.isRequired,
  tableId: PropTypes.string.isRequired,
};

export default HeroSeat;
