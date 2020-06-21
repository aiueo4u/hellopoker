import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

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
        <Box className={classes.leftContainer}>
          <Button className={classes.button} variant="contained" onClick={muckAction} color="secondary">
            Muck
          </Button>
        </Box>
        <Box className={classes.rightContainer}>
          <Button className={classes.button} variant="contained" onClick={showAction} color="primary">
            Show
          </Button>
        </Box>
      </div>
    );
  }

  // Fold or Check or Call
  return (
    <Box className={classes.container}>
      <Box className={classes.leftContainer}>
        <Button className={classes.button} variant="contained" onClick={foldAction} color="secondary">
          Fold
        </Button>
      </Box>
      <Box className={classes.rightContainer}>
        {checkable ? (
          <Button className={classes.button} variant="contained" onClick={checkAction}>
            Check
          </Button>
        ) : (
          <Button className={classes.button} variant="contained" onClick={callAction} color="primary">
            Call
          </Button>
        )}
        <Box ml={2}>
          <Tooltip
            //open
            classes={{ tooltip: classes.popper }}
            placement="left"
            title={
              <ChipAmountControlContainer
                betButton={
                  <Button
                    className={classes.betButton}
                    disabled={player.betAmountInState + player.betSize < minimumBetAmount}
                    variant="contained"
                    onClick={betAction}
                    color="primary"
                  >
                    Bet
                  </Button>
                }
                resetButton={
                  <Button className={classes.resetButton} onClick={resetBetSize}>
                    Reset
                  </Button>
                }
              />
            }
            arrow
            interactive
          >
            <Button className={classes.button} variant="contained">
              Bet
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

PlayerActions.propTypes = {
  player: PropTypes.object.isRequired,
  tableId: PropTypes.string.isRequired,
};

export default PlayerActions;
