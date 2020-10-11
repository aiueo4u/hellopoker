import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './PokerChipStyles';
import useChipStyles from './ChipStyles';

const Chip = ({ index, label }) => {
  const classes = useChipStyles({ index, label });

  return (
    <div className={classes.chip}>
      <div className={classes.top}>{label > 0 && <div className={classes.label}>{label}</div>}</div>
      <div className={classes.body} />
    </div>
  );
};

Chip.propTypes = {
  index: PropTypes.number.isRequired,
  label: PropTypes.number.isRequired,
};

const amountToChips = amount => {
  let remain = amount;
  const chips = [];

  [10000, 5000, 1000, 500, 100].map(label => {
    const count = parseInt(remain / label);
    chips.unshift({ label, count });
    remain -= label * count;
  });

  if (remain === amount) {
    return [{ label: 0, count: 1 }];
  }

  return chips;
};

const PokerChip = ({ amount }) => {
  const classes = useStyles();
  const chips = amountToChips(amount);

  let totalIndex = 0;

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        {chips.map(chip => {
          return [...Array(chip.count).keys()].map(_ => {
            return <Chip key={totalIndex} label={chip.label} index={totalIndex++} />;
          });
        })}
      </div>
      <div className={classes.amount}>{amount}</div>
    </div>
  );
};

PokerChip.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default PokerChip;
