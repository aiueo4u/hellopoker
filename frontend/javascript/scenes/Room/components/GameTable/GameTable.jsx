import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/styles';

import EmptySeat from 'components/EmptySeat';
import WebRTCTest from 'components/WebRTCTest';

import CentralCard from './components/CentralCard';
import PlayerPanel from './components/PlayerPanel';
import HeroPlayerPanel from './components/HeroPlayerPanel';
import PlayerChipBetArea from './components/PlayerChipBetArea';

import selectSortedPlayers from './selectors/selectSortedPlayers';
import styles from './GameTableStyles';

const useStyles = makeStyles(styles);

function GameTable({
  tableId,
  gameTable,
  isSeated,
  playerSession,
  players,
  onGameStart,
}) {
  const classes = useStyles();
  const sortedPlayers = selectSortedPlayers(players, playerSession.playerId);
  const playerPanelProps = index => ({ player: sortedPlayers[index], tableId });
  const playerOnTurn = players.find(player => player.seat_no === gameTable.currentSeatNo)
  const dispatch = useDispatch();

  useEffect(() => {
    if (playerOnTurn) {
      dispatch({ type: "CHANGED_PLAYER_TURN", player: playerOnTurn });
    }
  }, [playerOnTurn]);

  return (
    <div className={classes.container}>
      <WebRTCTest player={playerOnTurn} local />
      <CentralCard />

      <div className={classes.playerChipBetArea}>
        <PlayerChipBetArea />
      </div>

      <div className={useStyles({ position: 0 }).playerContainer}>
        {sortedPlayers[0].id ? (
          <HeroPlayerPanel {...playerPanelProps(0)} playerOnTurn={playerOnTurn} />
        ) : (
          <EmptySeat tableId={tableId} seatNo={sortedPlayers[0].seat_no} />
        )}
      </div>

      <div className={useStyles({ position: 1 }).playerContainer}>
        {sortedPlayers[1].id ? (
          <PlayerPanel {...playerPanelProps(1)} position="left" />
        ) : (
          <EmptySeat tableId={tableId} seatNo={sortedPlayers[1].seat_no} />
        )}
      </div>

      <div className={useStyles({ position: 2 }).playerContainer}>
        {sortedPlayers[2].id ? (
          <PlayerPanel {...playerPanelProps(2)} position="left" />
        ) : (
          <EmptySeat tableId={tableId} seatNo={sortedPlayers[2].seat_no} />
        )}
      </div>

      <div className={useStyles({ position: 3 }).playerContainer}>
        {sortedPlayers[3].id ? (
          <PlayerPanel {...playerPanelProps(3)} position="top" />
        ) : (
          <EmptySeat tableId={tableId} seatNo={sortedPlayers[3].seat_no} />
        )}
      </div>

      <div className={useStyles({ position: 4 }).playerContainer}>
        {sortedPlayers[4].id ? (
          <PlayerPanel {...playerPanelProps(4)} position="right" />
        ) : (
          <EmptySeat tableId={tableId} seatNo={sortedPlayers[4].seat_no} />
        )}
      </div>

      <div className={useStyles({ position: 5 }).playerContainer}>
        {sortedPlayers[5].id ? (
          <PlayerPanel {...playerPanelProps(5)} position="right" />
        ) : (
          <EmptySeat tableId={tableId} seatNo={sortedPlayers[5].seat_no} />
        )}
      </div>
    </div>
  );
};

export default GameTable;
