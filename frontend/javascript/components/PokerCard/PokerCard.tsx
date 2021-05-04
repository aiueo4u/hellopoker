import * as React from 'react';
import classNames from 'classnames';
import { useStyles } from './PokerCardStyles';

type Props = {
  rank: string;
  suit?: string;
  invisible?: boolean;
  size?: string;
};

export const PokerCard: React.FC<Props> = ({ rank = '', suit = '', invisible = false, size = '' }) => {
  const classes = useStyles({ rank, suit, invisible, size });

  return (
    <div className={classes.base}>
      <div className={classes.inner}>
        <div className={classes.back} />
        <div className={classNames(classes.card, classes.rank, classes.suit)}>
          <div className={classes.faceSuit}>
            {suit === 's' && <span>&#9824;</span>}
            {suit === 'h' && <span>&#9829;</span>}
            {suit === 'd' && <span>&#9830;</span>}
            {suit === 'c' && <span>&#9827;</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
