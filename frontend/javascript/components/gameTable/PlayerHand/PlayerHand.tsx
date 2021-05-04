import * as React from 'react';
import classNames from 'classnames';

import { PokerCard } from 'components/PokerCard';
import useGameTableState from 'hooks/useGameTableState';
import { useStyles } from './PlayerHandStyles';
import { usePlayerHand } from './hooks/usePlayerHand';

export const PlayerHand = ({
  isHero = false,
  position,
  player,
}: {
  isHero?: boolean;
  position: number;
  player: any;
}) => {
  if (!player.id) return null;
  if (player.state === null) return null;

  const classes: any = useStyles();
  const gameTable = useGameTableState();

  const [isDealt, setIsDealt] = React.useState(false);
  const [dealing, setDealing] = React.useState(false);
  const { isRoomViewer, cardsByPlayerId } = usePlayerHand();

  const onAnimationEnd = () => {
    setDealing(false);
  };

  React.useEffect(() => {
    setIsDealt(gameTable.justCreated);
    if (gameTable.justCreated) setDealing(true);
  }, [gameTable.justCreated]);

  const cards =
    (isRoomViewer ? cardsByPlayerId[player.id] : isHero ? gameTable.dealtCards[player.id] : player.cards) || [];
  // const invisible = (!isHero && !player.handShow) || dealing;
  const invisible = cards.length === 0 || dealing;

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
