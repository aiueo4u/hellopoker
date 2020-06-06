import React from 'react';
import PropTypes from 'prop-types';

import EmptySeat from 'components/EmptySeat';
import PlayerPanel from '../GameTable/components/PlayerPanel';

import useStyles from './PlayerSeatStyles';

const PlayerSeat = ({ player, position, tableId }) => {
  const classes = useStyles({ position });
  const panelPosition = position === 3 ? 'top' : position < 3 ? 'left' : 'right';

  return (
    <div className={classes.playerContainer}>
      {player.id ? (
        <PlayerPanel player={player} tableId={tableId} position={panelPosition} />
      ) : (
        <EmptySeat tableId={tableId} seatNo={player.seat_no} />
      )}
    </div>
  );
};

PlayerSeat.propTypes = {
  player: PropTypes.object.isRequired,
  position: PropTypes.number.isRequired,
  tableId: PropTypes.string.isRequired,
};

export default PlayerSeat;
