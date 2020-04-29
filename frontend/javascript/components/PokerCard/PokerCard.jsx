import React from 'react';
import classNames from 'classnames';
import useStyles from './PokerCardStyles';

const PokerCard = ({ rank, suit, invisible, size }) => {
  const classes = useStyles({ rank, suit, invisible, size });

  return (
    <div>
      <div className={classNames(classes.card, classes.rank, classes.suit)}>
        <div className={classes.faceOrBack}>
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

export default PokerCard;
