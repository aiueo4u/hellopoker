import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from './PokerCardStyles';

const PokerCard = ({ position, rank, suit, invisible, size }) => {
  const classes = useStyles({ position, rank, suit, invisible, size });

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

PokerCard.propTypes = {
  invisible: PropTypes.bool,
  rank: PropTypes.string,
  position: PropTypes.string,
  size: PropTypes.string,
  suit: PropTypes.string,
};

PokerCard.defaultProps = {
  invisible: false,
  rank: null,
  position: null,
  size: null,
  suit: null,
};

export default PokerCard;
