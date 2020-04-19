import React from 'react';

import { makeStyles } from '@material-ui/styles';

import EmptySeat from 'components/EmptySeat';

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

  return (
    <div className={classes.container}>
      <CentralCard />

      <div className={classes.playerChipBetArea}>
        <PlayerChipBetArea />
      </div>

      <div className={useStyles({ position: 0 }).playerContainer}>
        {sortedPlayers[0].id ? (
          <HeroPlayerPanel {...playerPanelProps(0)} playerOnTurn={playerOnTurn} />
        ) : (
          <EmptySeat tableId={tableId} seatNo={1} />
        )}
      </div>

      <div className={useStyles({ position: 1 }).playerContainer}>
        {sortedPlayers[1].id ? (
          <PlayerPanel {...playerPanelProps(1)} position="left" />
        ) : (
          <EmptySeat tableId={tableId} seatNo={2} />
        )}
      </div>

      <div className={useStyles({ position: 2 }).playerContainer}>
        {sortedPlayers[2].id ? (
          <PlayerPanel {...playerPanelProps(2)} position="left" />
        ) : (
          <EmptySeat tableId={tableId} seatNo={3} />
        )}
      </div>

      <div className={useStyles({ position: 3 }).playerContainer}>
        {sortedPlayers[3].id ? (
          <PlayerPanel {...playerPanelProps(3)} position="top" />
        ) : (
          <EmptySeat tableId={tableId} seatNo={4} />
        )}
      </div>

      <div className={useStyles({ position: 4 }).playerContainer}>
        {sortedPlayers[4].id ? (
          <PlayerPanel {...playerPanelProps(4)} position="right" />
        ) : (
          <EmptySeat tableId={tableId} seatNo={5} />
        )}
      </div>

      <div className={useStyles({ position: 5 }).playerContainer}>
        {sortedPlayers[5].id ? (
          <PlayerPanel {...playerPanelProps(5)} position="right" />
        ) : (
          <EmptySeat tableId={tableId} seatNo={6} />
        )}
      </div>
    </div>
  );
};

export default GameTable;
