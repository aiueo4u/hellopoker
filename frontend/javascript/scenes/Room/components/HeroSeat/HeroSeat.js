import React from 'react';
import PropTypes from 'prop-types';

import EmptySeat from 'components/EmptySeat';
import PlayerActions from 'components/PlayerActions';
import useGameTableState from 'hooks/useGameTableState';
import useIsMobile from 'hooks/useIsMobile';
import HeroPlayerPanel from '../GameTable/components/HeroPlayerPanel';

import useStyles from './HeroSeatStyles';

const HeroSeat = ({ player, tableId }) => {
  const classes = useStyles();
  const { tournament } = useGameTableState();
  const { isMobile } = useIsMobile();

  return (
    <div className={classes.container}>
      {player.id ? (
        <>
          <HeroPlayerPanel player={player} tableId={tableId} />
          {!isMobile && <PlayerActions player={player} tableId={tableId} />}
        </>
      ) : !tournament ? (
        <EmptySeat tableId={tableId} seatNo={player.seatNo} />
      ) : null}
    </div>
  );
};

HeroSeat.propTypes = {
  player: PropTypes.object.isRequired,
  tableId: PropTypes.string.isRequired,
};

export default HeroSeat;
