import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PokerCard from 'components/PokerCard';
import useGameTableState from 'hooks/useGameTableState';
import useStyles from './PlayerHandStyles';

const PlayerHand = ({ isHero, position, player }) => {
  if (!player.id) return null;
  if (player.state === null) return null;

  const classes = useStyles();
  const gameTable = useGameTableState();

  const [isDealt, setIsDealt] = useState(false);
  const [dealing, setDealing] = useState(false);
  const onAnimationEnd = () => {
    setDealing(false);
  };

  useEffect(() => {
    setIsDealt(gameTable.justCreated);
    if (gameTable.justCreated) setDealing(true);
  }, [gameTable.justCreated]);

  const invisible = (!isHero && !player.handShow) || dealing;
  const cards = isHero ? gameTable.dealtCards[player.id] : player.cards;

  const isCards = !invisible && cards && cards.length == 2;

  const leftRank = (isCards && cards[0].rank) || null;
  const rightRank = (isCards && cards[1].rank) || null;
  const leftSuit = (isCards && cards[0].suit) || null;
  const rightSuit = (isCards && cards[1].suit) || null;

  // TODO: !inGame hidden

  return (
    <div>
      <div
        className={classNames(classes.base, {
          [classes[`position${position}Left`]]: !player.handShow && isDealt,
          [classes[`dealt${position}Left`]]: !player.handShow && !isDealt,
          [classes[`show${position}Left`]]: !!player.handShow,
          [classes[`muck${position}Left`]]:
            player.state === 'folded' || (typeof player.handShow === 'boolean' && !player.handShow),
        })}
        onAnimationEnd={onAnimationEnd}
      >
        <PokerCard rank={leftRank} suit={leftSuit} invisible={invisible} size="medium" />
      </div>
      <div
        className={classNames(classes.base, {
          [classes[`position${position}Right`]]: !player.handShow && isDealt,
          [classes[`dealt${position}Right`]]: !player.handShow && !isDealt,
          [classes[`show${position}Right`]]: !!player.handShow,
          [classes[`muck${position}Right`]]:
            player.state === 'folded' || (typeof player.handShow === 'boolean' && !player.handShow),
        })}
        onAnimationEnd={onAnimationEnd}
      >
        <PokerCard rank={rightRank} suit={rightSuit} invisible={invisible} size="medium" />
      </div>
    </div>
  );
};

PlayerHand.propTypes = {
  isHero: PropTypes.bool,
  position: PropTypes.number.isRequired,
  player: PropTypes.object.isRequired,
};

PlayerHand.defaultProps = {
  isHero: false,
};

export default PlayerHand;
