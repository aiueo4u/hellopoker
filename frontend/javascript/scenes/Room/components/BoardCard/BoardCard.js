import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PokerCard from 'components/PokerCard';
import useStyles from './BoardCardStyles';

const BoardCard = ({ position, gameTable }) => {
  const classes = useStyles();
  const [animated, setAnimated] = useState(false);

  const rank = gameTable.boardCards[position] ? gameTable.boardCards[position][0] : null;
  const suit = gameTable.boardCards[position] ? gameTable.boardCards[position][1] : null;

  const round = position === 4 ? 'river' : position === 3 ? 'turn' : 'flop';
  const invisible = !gameTable.boardCards[position] || !gameTable.reachedRounds[round];
  const playAnimation = !invisible && gameTable.justActioned && gameTable.gameHandState === round;

  useEffect(() => {
    if (playAnimation && !animated) setAnimated(true);
  }, [playAnimation]);

  useEffect(() => {
    setAnimated(false);
  }, [gameTable.gameHandCount]);

  return (
    <div
      className={classNames(classes.card, {
        [classes[`card${position}`]]: animated,
        [classes[`card${position}Animated`]]: !playAnimation && !invisible,
      })}
    >
      <PokerCard rank={rank} suit={suit} invisible={invisible} />
    </div>
  );
};

BoardCard.propTypes = {
  gameTable: PropTypes.object.isRequired,
  position: PropTypes.number.isRequired,
};

export default BoardCard;
