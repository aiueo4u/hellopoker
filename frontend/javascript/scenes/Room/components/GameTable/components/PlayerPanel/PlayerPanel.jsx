import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
//import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';

import PlayerAvatar from 'components/PlayerAvatar';
import PlayerMenuDialog from 'components/PlayerMenuDialog';
import PokerCard from 'components/PokerCard';
import DealerButtonPlate from 'components/DealerButtonPlate';

import { nameByActionType } from 'helpers/actionType';
import useGameTableState from 'hooks/useGameTableState';
import useDialogState from 'hooks/useDialogState';
import usePlayerActionTimer from 'hooks/usePlayerActionTimer';

import styles from './PlayerPanelStyles';

const useStyles = makeStyles(styles);

const PlayerPanel = ({ tableId, leftSideStyle, rightSideStyle, position, topRightSideStyle, player }) => {
  const dispatch = useDispatch();
  const gameTable = useGameTableState();
  const [isOpen, openDialog, closeDialog] = useDialogState();

  const { remainTimePercentage } = usePlayerActionTimer(player, gameTable);
  const isPlayerTurn = player.seat_no === gameTable.currentSeatNo;
  const classes = useStyles({ player, position, isPlayerTurn });

  // TODO
  /*
  if (!player.id) {
    player.id = 123;
    player.nickname = 'aiueo4u-hogehoge';
    player.image_url = 'https://pbs.twimg.com/media/EUK26AJVAAAjUUr?format=jpg&name=240x240';
    player.stack = 12345;
    player.bet_amount_in_state = 1234;
  }
  */

  const showHand = player.hand_show;

  return (
    <>
      <Box className={classes.panelContainer} onClick={openDialog}>
        <div className={classes.nickname}>{player.nickname}</div>
        <Box mt={1 / 2} position="relative" height="60px">
          <Box display="inline-block">
            <PlayerAvatar player={player} isTurn={isPlayerTurn} />
          </Box>
          {isPlayerTurn && !!remainTimePercentage && (
            <LinearProgress
              variant="determinate"
              value={remainTimePercentage}
            />
            /*
            <CircularProgress
              className={classes.progress}
              variant="static"
              value={remainTimePercentage}
              thickness={2.4}
              size={80}
            />
              */
          )}
        </Box>

        {gameTable.inGame && !player.hand_show && player.state !== null && player.state !== 'folded' && (
          <Box display="flex" justifyContent="center" className={classes.handContainer}>
            <PokerCard invisible={!showHand} size="small" />
            <PokerCard invisible={!showHand} size="small" />
          </Box>
        )}

        {player.hand_show && player.state !== null && player.state !== 'folded' && (
          <Box display="flex" justifyContent="center" className={classes.handContainer}>
            <PokerCard rank={player.cards[0].rank} suit={player.cards[0].suit} />
            <PokerCard rank={player.cards[1].rank} suit={player.cards[1].suit} />
          </Box>
        )}

        <div className={classes.statusCard}>
          {!!player.actionType ? (
            <div className={classes.actionType}>{nameByActionType[player.actionType]}</div>
          ) : (player.stack - (player.betSize || 0)) === 0 ? (
            <div className={classes.allin}>オールイン</div>
          ) : (
            <div className={classes.stackSize}>{player.stack - (player.betSize || 0)}</div>
          )}
        </div>

        {player.seat_no === gameTable.buttonSeatNo && (
          <div className={classes.dealerButton}>
            <DealerButtonPlate />
          </div>
        )}

        {/* チップ増減結果 */}
        {gameTable.gameHandState === 'finished' && !!player.amount_diff && (
          <div className={classes.betAmount}>
            <span className={classes.result}>
              {player.amount_diff > 0 && <span>+</span>}
              {player.amount_diff}
            </span>
          </div>
        )}

        {/* ベット額 */}
        {gameTable.inGame && !!(player.bet_amount_in_state || player.betSize) && (
          <div className={classes.betAmount}>
            {player.betSize
              ? `${player.bet_amount_in_state || 0} → ${player.bet_amount_in_state + player.betSize}`
              : `${player.bet_amount_in_state > 0 ? player.bet_amount_in_state : ''}`}
          </div>
        )}
      </Box>
      <PlayerMenuDialog isOpen={isOpen} onClose={closeDialog} player={player} tableId={tableId} />
    </>
  );
};

export default PlayerPanel;
