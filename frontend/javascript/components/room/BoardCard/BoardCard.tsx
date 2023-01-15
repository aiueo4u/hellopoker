import * as React from 'react';

import classNames from 'classnames';

import { PokerCard } from 'components/PokerCard';
import { GameTableState } from 'services/reducers/gameTable';

import { useStyles } from './BoardCardStyles';

const getRoundByPosition = (position: 0 | 1 | 2 | 3 | 4) => ['flop', 'flop', 'flop', 'turn', 'river'][position];

export const BoardCard = ({ position, gameTable }: { position: 0 | 1 | 2 | 3 | 4; gameTable: GameTableState }) => {
  const classes = useStyles();
  const [animated, setAnimated] = React.useState(false);

  const rank = gameTable.boardCards[position] ? gameTable.boardCards[position][0] : null;
  const suit = gameTable.boardCards[position] ? gameTable.boardCards[position][1] : null;

  const round = getRoundByPosition(position);

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
