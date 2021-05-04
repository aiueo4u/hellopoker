import * as React from 'react';
import classNames from 'classnames';
import { PokerCard } from 'components/PokerCard';
import { useStyles } from './BoardCardStyles';

export const BoardCard = ({ position, gameTable }: { position: number; gameTable: any }) => {
  const classes = useStyles();
  const [animated, setAnimated] = React.useState(false);

  const rank = gameTable.boardCards[position] ? gameTable.boardCards[position][0] : null;
  const suit = gameTable.boardCards[position] ? gameTable.boardCards[position][1] : null;

  let round;
  switch (position) {
    case 4:
      round = 'river';
      break;
    case 3:
      round = 'turn';
      break;
    default:
      round = 'flop';
      break;
  }

  const invisible = !gameTable.boardCards[position] || !gameTable.reachedRounds[round];
  const playAnimation = !invisible && gameTable.justActioned && gameTable.gameHandState === round;

  React.useEffect(() => {
    if (playAnimation && !animated) setAnimated(true);
  }, [playAnimation]);

  React.useEffect(() => {
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
