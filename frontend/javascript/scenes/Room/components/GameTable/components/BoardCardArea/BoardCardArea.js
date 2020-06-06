import React from 'react';
import PropTypes from 'prop-types';
import PokerCard from 'components/PokerCard';
import useStyles from './BoardCardAreaStyles';

const BoardCardArea = ({ gameTable }) => {
  const classes = useStyles();

  if (!gameTable) return null;

  return (
    <div className={classes.container}>
      <div className={classes.card1}>
        {gameTable.boardCards[0] && gameTable.reachedRounds.flop ? (
          <PokerCard rank={gameTable.boardCards[0][0]} suit={gameTable.boardCards[0][1]} />
        ) : (
          <PokerCard invisible />
        )}
      </div>
      <div className={classes.card2}>
        {gameTable.boardCards[1] && gameTable.reachedRounds.flop ? (
          <PokerCard rank={gameTable.boardCards[1][0]} suit={gameTable.boardCards[1][1]} />
        ) : (
          <PokerCard invisible />
        )}
      </div>
      <div className={classes.card3}>
        {gameTable.boardCards[2] && gameTable.reachedRounds.flop ? (
          <PokerCard rank={gameTable.boardCards[2][0]} suit={gameTable.boardCards[2][1]} />
        ) : (
          <PokerCard invisible />
        )}
      </div>
      <div className={classes.card4}>
        {gameTable.boardCards[3] && gameTable.reachedRounds.turn ? (
          <PokerCard rank={gameTable.boardCards[3][0]} suit={gameTable.boardCards[3][1]} />
        ) : (
          <PokerCard invisible />
        )}
      </div>
      <div className={classes.card5}>
        {gameTable.boardCards[4] && gameTable.reachedRounds.river ? (
          <PokerCard rank={gameTable.boardCards[4][0]} suit={gameTable.boardCards[4][1]} />
        ) : (
          <PokerCard invisible />
        )}
      </div>
    </div>
  );
};

BoardCardArea.propTypes = {
  gameTable: PropTypes.object.isRequired,
};

export default BoardCardArea;
