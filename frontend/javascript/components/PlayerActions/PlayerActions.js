import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles'

import ChipAmountControlContainer from 'components/ChipAmountControlContainer';
import EmptySeat from 'components/EmptySeat';
import PlayerAvatar from 'components/PlayerAvatar';
import PlayerMenuDialog from 'components/PlayerMenuDialog';
import PokerCard from 'components/PokerCard';

import useActions from 'hooks/useActions';
import useDialogState from 'hooks/useDialogState';
import useGameTableState from 'hooks/useGameTableState';
import usePlayerActionTimer from 'hooks/usePlayerActionTimer';

import styles from './PlayerActionsStyles';

const useStyles = makeStyles(styles);

const PlayerActions = ({ player, tableId }) => {
  const gameTable = useGameTableState();
  const classes = useStyles({ player });
  const [
    betAction,
    callAction,
    checkAction,
    foldAction,
    muckAction,
    resetBetSize,
    showAction,
  ] = useActions(tableId, player);

  const aggressivePlayerExist = gameTable.lastAggressiveSeatNo ? true : false
  const checkable = !aggressivePlayerExist || gameTable.lastAggressiveSeatNo === player.seat_no

  if (!gameTable.inGame || gameTable.currentSeatNo !== player.seat_no) return null;

  // Muck or Show
  if (gameTable.showOrMuck) {
    return (
      <>
        <Button className={classNames([classes.button, classes.leftButton])} variant="contained" onClick={muckAction}>Muck</Button>
        <Button className={classNames([classes.button, classes.rightButton])} variant="contained" onClick={showAction}>Show</Button>
      </>
    );
  }

  // Reset or Bet
  if (player.betSize > 0) {
    return (
      <>
        <Button className={classNames([classes.button, classes.leftButton])} variant="contained" onClick={resetBetSize}>
          Reset
        </Button>
        <Button className={classNames([classes.button, classes.rightButton])} variant="contained" onClick={betAction} color="primary">
          Bet
        </Button>
        <ChipAmountControlContainer />}
      </>
    );
  }

  // Fold or Check or Call
  return (
    <>
      <Button
        className={classNames([classes.button, classes.leftButton])}
        variant="contained"
        onClick={foldAction}
        color="secondary"
      >
        Fold
      </Button>
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
      <ChipAmountControlContainer />}
    </>
  );
};

PlayerActions.propTypes = {
};

export default PlayerActions;
