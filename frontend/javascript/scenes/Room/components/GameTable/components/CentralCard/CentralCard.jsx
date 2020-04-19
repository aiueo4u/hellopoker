import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles';

import useGameTableState from 'hooks/useGameTableState';
import usePlayerSessionState from 'hooks/usePlayerSessionState';
import usePlayersState from 'hooks/usePlayersState';

import BoardCardArea from '../BoardCardArea';
import GameStartCountdown from '../GameStartCountdown'

import styles from './CentralCardStyles';

const useStyles = makeStyles(styles);

function CentralCard() {
  const classes = useStyles();
  const session = usePlayerSessionState();
  const gameTable = useGameTableState();
  const players = usePlayersState();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const tableId = match.params.id;
    
  const isSeated = players.some(player => player.id === session.playerId);

  const onGameStart = () => {
    dispatch({ type: 'GAME_START_BUTTON_CLICKED', tableId });
  };

  if (players.length === 1) {
    return (
      <div className={classes.container}>
        <Box textAlign="center">
          <div>他のプレイヤーの参加を待っています...</div>
        </Box>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <Box textAlign="center">
        {gameTable.isOpenGameStartCountdown && isSeated && (
          <Box mt={2}>
            <GameStartCountdown count={gameTable.timeToStart}/>
          </Box>
        )}
        {!gameTable.inGame && isSeated && (
          <Button variant="contained" color="primary" onClick={onGameStart}>開始</Button>
        )}
        {gameTable.inGame && <div className={classes.pot}>{gameTable.pot}</div>}
        <BoardCardArea gameTable={gameTable} />
      </Box>
    </div>
  );
};

export default CentralCard;
