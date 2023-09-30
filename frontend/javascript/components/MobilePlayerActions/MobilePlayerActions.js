import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

import { ChipAmountControlContainer } from 'components/ChipAmountControlContainer';
import useActions from 'hooks/useActions';
import useDialogState from 'hooks/useDialogState';
import useGameTableState from 'hooks/useGameTableState';
import usePlayerSessionState from 'hooks/usePlayerSessionState';

import useStyles from './MobilePlayerActionsStyles';

const MobilePlayerActions = ({ player, tableId }) => {
  const gameTable = useGameTableState();
  const classes = useStyles({ player });
  const [betAction, callAction, checkAction, foldAction, muckAction, resetBetSize, showAction, loading] = useActions(
    tableId,
    player,
    gameTable
  );
  const [isOpen, openTooltip, closeTooltip] = useDialogState();
  const { playerId } = usePlayerSessionState();

  const aggressivePlayerExist = !!gameTable.lastAggressiveSeatNo;
  const checkable = !aggressivePlayerExist || gameTable.lastAggressiveSeatNo === player.seatNo;

  if (playerId !== player.id) return null;
  if (loading || !gameTable.inGame || gameTable.currentSeatNo !== player.seatNo) return null;

  // Muck or Show
  if (gameTable.showOrMuck) {
    return (
      <div className={classes.container}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Button className={classes.button} variant="contained" onClick={muckAction} color="secondary">
              Muck
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button className={classes.button} variant="contained" onClick={showAction} color="primary">
              Show
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }

  // Fold or Check or Call
  return (
    <Box className={classes.container}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Button className={classes.button} variant="contained" onClick={foldAction} color="secondary">
            Fold
          </Button>
        </Grid>
        <Grid item xs={4}>
          {checkable ? (
            <Button className={classes.button} variant="contained" onClick={checkAction}>
              Check
            </Button>
          ) : (
            <Button className={classes.button} variant="contained" onClick={callAction} color="primary">
              Call
            </Button>
          )}
        </Grid>
        <Grid item xs={4}>
          <Tooltip
            open={isOpen}
            onClose={() => {}}
            classes={{ tooltip: classes.popper }}
            // placement="left"
            title={
              <ChipAmountControlContainer
                betButton={
                  <Button
                    className={classes.betButton}
                    disabled={player.betSize < player.minBetAmount}
                    variant="contained"
                    onClick={() => {
                      betAction();
                      closeTooltip();
                    }}
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
                closeButton={
                  <Button className={classes.resetButton} onClick={closeTooltip}>
                    キャンセル
                  </Button>
                }
              />
            }
            arrow
            interactive
          >
            <Button className={classes.button} variant="contained" onClick={openTooltip}>
              Bet
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};

MobilePlayerActions.propTypes = {
  player: PropTypes.object.isRequired,
  tableId: PropTypes.string.isRequired,
};

export default MobilePlayerActions;
