import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import EmptySeat from 'components/EmptySeat';
import PlayerPanel from 'components/PlayerPanel';
import useGameTableState from 'hooks/useGameTableState';

import useStyles from './PlayerSeatStyles';

const PlayerSeat = ({ player, position, tableId }) => {
  const classes = useStyles({ position });
  const { tournament } = useGameTableState();

  return (
    <div className={classNames(classes.base, classes.playerContainer)}>
      {player.id ? (
        <PlayerPanel player={player} tableId={tableId} position={position} />
      ) : !tournament ? (
        <EmptySeat tableId={tableId} seatNo={player.seatNo} />
      ) : null}
    </div>
  );
};

PlayerSeat.propTypes = {
  player: PropTypes.object.isRequired,
  position: PropTypes.number.isRequired,
  tableId: PropTypes.string.isRequired,
};

export default PlayerSeat;
