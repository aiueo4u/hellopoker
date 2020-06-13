import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import ChipAmountControlContainer from 'components/ChipAmountControlContainer';

import useActions from 'hooks/useActions';
import useBetAction from 'hooks/useBetAction';
import useGameTableState from 'hooks/useGameTableState';

import useStyles from './PlayerActionsStyles';

const PlayerActions = ({ player, tableId }) => {
  const gameTable = useGameTableState();
  const classes = useStyles({ player });
  const [betAction, callAction, checkAction, foldAction, muckAction, resetBetSize, showAction, loading] = useActions(
    tableId,
    player,
    gameTable
  );
  const { minimumBetAmount } = useBetAction(player);

  const aggressivePlayerExist = gameTable.lastAggressiveSeatNo ? true : false;
  const checkable = !aggressivePlayerExist || gameTable.lastAggressiveSeatNo === player.seatNo;

  if (loading || !gameTable.inGame || gameTable.currentSeatNo !== player.seatNo) return null;

  // Muck or Show
  if (gameTable.showOrMuck) {
    return (
      <div className={classes.container}>
        <Box>
          <Button
            className={classNames([classes.button, classes.leftButton])}
            variant="contained"
            onClick={muckAction}
            color="secondary"
          >
            Muck
          </Button>
        </Box>
        <Box ml={2}>
          <Button
            className={classNames([classes.button, classes.rightButton])}
            variant="contained"
            onClick={showAction}
            color="primary"
          >
            Show
          </Button>
        </Box>
      </div>
    );
  }

  // Reset or Bet
  if (player.betSize > 0) {
    return (
      <div className={classes.container}>
        <Box>
          <ChipAmountControlContainer />
        </Box>
        <Box ml={2}>
          <Button
            className={classNames([classes.button, classes.leftButton])}
            variant="contained"
            onClick={resetBetSize}
          >
            Reset
          </Button>
        </Box>
        <Box ml={2}>
          <Button
            className={classNames([classes.button, classes.rightButton])}
            disabled={player.betAmountInState + player.betSize < minimumBetAmount}
            variant="contained"
            onClick={betAction}
            color="primary"
          >
            Bet
          </Button>
        </Box>
      </div>
    );
  }

  // Fold or Check or Call
  return (
    <Box className={classes.container}>
      <Box>
        <ChipAmountControlContainer />
      </Box>
      <Box ml={2}>
        <Button
          className={classNames([classes.button, classes.leftButton])}
          variant="contained"
          onClick={foldAction}
          color="secondary"
        >
          Fold
        </Button>
      </Box>
      <Box ml={2}>
        {checkable ? (
          <Button
            className={classNames([classes.button, classes.rightButton])}
            variant="contained"
            onClick={checkAction}
          >
            Check
          </Button>
        ) : (
          <Button
            className={classNames([classes.button, classes.rightButton])}
            variant="contained"
            onClick={callAction}
            color="primary"
          >
            Call
          </Button>
        )}
      </Box>
    </Box>
  );
};

PlayerActions.propTypes = {
  player: PropTypes.object.isRequired,
  tableId: PropTypes.string.isRequired,
};

export default PlayerActions;
