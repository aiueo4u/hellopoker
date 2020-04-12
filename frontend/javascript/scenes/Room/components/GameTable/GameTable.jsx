import React from 'react';

import { makeStyles } from '@material-ui/styles';

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
      <div className={classes.playerChipBetArea}>
        <PlayerChipBetArea />
      </div>

      <div className={classes.heroPlayerContainer}>
        <HeroPlayerPanel {...playerPanelProps(0)} playerOnTurn={playerOnTurn} />
      </div>

      <div className={classes.playerContainer1}>
        <PlayerPanel {...playerPanelProps(1)} position="left" />
      </div>

      <div className={classes.playerContainer2}>
        <PlayerPanel {...playerPanelProps(2)} position="left" />
      </div>

      <div className={classes.playerContainer3}>
        <PlayerPanel {...playerPanelProps(3)} position="top" />
      </div>

      <div className={classes.playerContainer4}>
        <PlayerPanel {...playerPanelProps(4)} position="right" />
      </div>
      <div className={classes.playerContainer5}>
        <PlayerPanel {...playerPanelProps(5)} position="right" />
      </div>

      <CentralCard />
    </div>
  );
};

export default GameTable;
