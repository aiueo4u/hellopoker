import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/styles';

import PlayerMenuDialog from 'components/PlayerMenuDialog';
import PokerCard from 'components/PokerCard';
import DealerButtonPlate from 'components/DealerButtonPlate';

import useGameTableState from 'hooks/useGameTableState';
import useDialogState from 'hooks/useDialogState';
import usePlayerActionTimer from 'hooks/usePlayerActionTimer';

import styles from './PlayerPanelStyles';

const useStyles = makeStyles(styles);

const readableActionType = actionType => {
  switch (actionType) {
    case 'bet':
      return 'ベット';
    case 'check':
      return 'チェック';
    case 'call':
      return 'コール';
    case 'fold':
      return 'フォールド';
    default:
      return actionType;
  }
};

const PlayerPanel = ({ tableId, leftSideStyle, rightSideStyle, position, topRightSideStyle, player }) => {
  const dispatch = useDispatch();
  const classes = useStyles({ position });
  const gameTable = useGameTableState();
  const [isOpen, openDialog, closeDialog] = useDialogState();

  const { remainTimePercentage } = usePlayerActionTimer(player, gameTable);
  const isPlayerTurn = player.seat_no === gameTable.currentSeatNo;

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
    <Box className={classes.panelContainer} onClick={openDialog}>
      <div>
        <Avatar src={player.image_url} className={classes.avatar} alt="" />
        {gameTable.inGame && !player.hand_show && player.state !== null && player.state !== 1 && (
          <Box display="flex" justifyContent="center">
            <PokerCard invisible={!showHand} />
            <PokerCard invisible={!showHand} />
          </Box>
        )}

        {player.hand_show && player.state !== null && player.state !== 1 && (
          <Box display="flex" justifyContent="center">
            <PokerCard rank={player.cards[0].rank} suit={player.cards[0].suit} />
            <PokerCard rank={player.cards[1].rank} suit={player.cards[1].suit} />
          </Box>
        )}
      </div>
      <div className={classes.statusCard}>
        {player.actionType ? (
          <Typography variant="caption" style={{ fontSize: '0.625rem', color: 'white' }}>
            {readableActionType(player.actionType)}
          </Typography>
        ) : (
          <>
            <div className={classes.nickname}>{player.nickname}</div>
            <div className={classes.stackSize}>{player.stack - (player.betSize || 0)}</div>
            {isPlayerTurn && remainTimePercentage && (
              <LinearProgress
                variant="determinate"
                value={remainTimePercentage}
              />
            )}
          </>
        )}
      </div>

      {player.seat_no === gameTable.buttonSeatNo && (
        <div className={classes.dealerButton}>
          <DealerButtonPlate />
        </div>
      )}

      {/* チップ増減結果 */}
      {gameTable.gameHandState === 'finished' && player.amount_diff && (
        <div className={classes.betAmount}>
          {player.amount_diff > 0 && <span>+</span>}
          {player.amount_diff}
        </div>
      )}

      {/* ベット額 */}
      {gameTable.inGame && (player.bet_amount_in_state || player.betSize) && (
        <div className={classes.betAmount}>
          {player.betSize
            ? `${player.bet_amount_in_state || 0} → ${player.bet_amount_in_state + player.betSize}`
            : `${player.bet_amount_in_state > 0 ? player.bet_amount_in_state : ''}`}
        </div>
      )}
      <PlayerMenuDialog isOpen={isOpen} onClose={closeDialog} player={player} tableId={tableId} />
    </Box>
  );
};

export default PlayerPanel;
