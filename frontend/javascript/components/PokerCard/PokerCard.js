import React from 'react';
import PropTypes from 'prop-types';
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

PokerCard.propTypes = {
  invisible: PropTypes.bool,
  rank: PropTypes.string,
  size: PropTypes.string,
  suit: PropTypes.string,
};

PokerCard.defaultProps = {
  invisible: false,
  rank: null,
  size: null,
  suit: null,
};

export default PokerCard;
