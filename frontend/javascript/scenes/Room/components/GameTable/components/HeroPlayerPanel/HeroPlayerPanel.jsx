import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import classNames from 'classnames';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles'

import EmptySeat from 'components/EmptySeat';

import PlayerAvatar from 'components/PlayerAvatar';
import PlayerMenuDialog from 'components/PlayerMenuDialog';
import PokerCard from 'components/PokerCard';

import useDialogState from 'hooks/useDialogState';
import useGameTableState from 'hooks/useGameTableState';
import usePlayerActionTimer from 'hooks/usePlayerActionTimer';

import styles from './HeroPlayerPanelStyles';

const useStyles = makeStyles(styles);

const HeroPlayerPanel = ({
  onCheckAction,
  onFoldAction,
  onCallAction,
  resetBetSize,
  dispatchBetAction,
  playerOnTurn,
  onMuckAction,
  onShowAction,
  player,
  tableId,
}) => {
  const dispatch = useDispatch();
  const gameTable = useGameTableState();
  const isHeroTurn = player && player.seat_no === gameTable.currentSeatNo;
  const { remainTimePercentage } = usePlayerActionTimer(player, gameTable);
  const [isOpen, openDialog, closeDialog] = useDialogState();

  const classes = useStyles({ player });

  const aggressivePlayerExist = gameTable.lastAggressiveSeatNo ? true : false
  const checkable = !aggressivePlayerExist || gameTable.lastAggressiveSeatNo === playerOnTurn.seat_no

  if (!player || !player.id) return (
    <div className={classes.panelContainer}>
      <EmptySeat tableId={tableId} seatNo={1} />
    </div>
  );

  const cards = gameTable.dealtCards[player.id];

  return (
    <div>
      <div className={classes.panelContainer}>
        {/*<div className={classes.nickname}>{player.nickname}</div>*/}
        <Box textAlign="center">
          <PlayerAvatar player={player} isTurn={isHeroTurn} />
        </Box>
        <div className={classes.statusCard} onClick={openDialog}>
          <div>
            <div className={classes.stackSize}>{player.betSize ? player.stack - player.betSize : player.stack}</div>
          </div>
          {isHeroTurn && remainTimePercentage > 0 && (
            <LinearProgress variant="determinate" value={remainTimePercentage} />
          )}
        </div>

        {cards && cards.length === 2 && player.state !== 1 && (
          <>
            <div className={classes.heroHoleCard1}>
              <PokerCard rank={cards[0].rank} suit={cards[0].suit} />
            </div>
            <div className={classes.heroHoleCard2}>
              <PokerCard rank={cards[1].rank} suit={cards[1].suit} />
            </div>
          </>
        )}
        {
          /* TODO: ほかプレイヤー操作 */
          gameTable.inGame && player && (gameTable.currentSeatNo === player.seat_no) ?

          playerOnTurn && playerOnTurn.betSize > 0 ? (
            <div>
              <Button
                className={classNames([classes.button, classes.leftButton])}
                variant="contained"
                onClick={resetBetSize}
              >
                Reset
              </Button>
              <Button
                className={classNames([classes.button, classes.rightButton])}
                variant="contained"
                onClick={dispatchBetAction}
                color="primary"
              >
                Bet
              </Button>
            </div>
          ) : playerOnTurn && gameTable.showOrMuck ? (
            <>
              <Button className={classNames([classes.button, classes.leftButton])} variant="contained" onClick={onMuckAction}>Muck</Button>
              <Button className={classNames([classes.button, classes.rightButton])} variant="contained" onClick={onShowAction}>Show</Button>
            </>
          ) : player.isHiddenPanel ? (
            <div />
          ) : (
            <>
              <Button
                className={classNames([classes.button, classes.leftButton])}
                variant="contained"
                onClick={onFoldAction}
                color="secondary"
              >
                Fold
              </Button>
              {checkable ? (
                <Button
                  className={classNames([classes.button, classes.rightButton])}
                  variant="contained"
                  onClick={onCheckAction}
                >
                  Check
                </Button>
              ) : (
                <Button
                  className={classNames([classes.button, classes.rightButton])}
                  variant="contained"
                  onClick={onCallAction}
                  color="primary"
                >
                  Call
                </Button>
              )}
            </>
          )
        : (<div />)
        }
      </div>

      <PlayerMenuDialog isOpen={isOpen} onClose={closeDialog} player={player} tableId={tableId} />
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { tableId, playerOnTurn } = ownProps;

  return {
    dispatchBetAction: () => {
      dispatch({
        type: "BET_ACTION",
        tableId: tableId,
        playerId: playerOnTurn.id,
        amount: playerOnTurn.betSize,
      });
    },
    resetBetSize: () => {
      dispatch({
        type: "RESET_BET_SIZE",
        tableId: tableId,
        playerId: playerOnTurn.id,
      });
    },
    onFoldAction: () => {
      dispatch({
        type: "FOLD_ACTION",
        tableId: tableId,
        playerId: playerOnTurn.id,
      })
    },
    onCallAction: () => {
      dispatch({
        type: "CALL_ACTION",
        tableId: tableId,
        playerId: playerOnTurn.id,
      })
    },
    onCheckAction: () => {
      dispatch({
        type: "CHECK_ACTION",
        tableId: tableId,
        playerId: playerOnTurn.id,
      })
    },
    onMuckAction: () => {
      dispatch({
        type: "MUCK_HAND_ACTION",
        tableId: tableId,
        playerId: playerOnTurn.id,
      })
    },
    onShowAction: () => {
      dispatch({
        type: "SHOW_HAND_ACTION",
        tableId: tableId,
        playerId: playerOnTurn.id,
      })
    },
  }
}

export default connect(null, mapDispatchToProps)(HeroPlayerPanel);
