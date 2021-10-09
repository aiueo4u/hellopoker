import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import Loading from 'components/Loading';
import { NetworkStatusDialog } from 'components/dialog/NetworkStatusDialog';
import TableMessageDrawer from 'components/TableMessageDrawer';

import useChipChannel from 'hooks/useChipChannel';
import useDealtCardChannel from 'hooks/useDealtCardChannel';
import useGameTableState from 'hooks/useGameTableState';
import usePlayerSessionState from 'hooks/usePlayerSessionState';
import usePlayersState from 'hooks/usePlayersState';
import useRoomViewerChannel from 'hooks/useRoomViewerChannel';
import useSkyWay from 'hooks/useSkyWay';

import { HeroSeat } from 'components/gameTable/HeroSeat';
import { PlayerHand } from 'components/gameTable/PlayerHand';
import { GameTable } from 'components/room/GameTable';
import { BoardCard } from 'components/room/BoardCard';
import { PlayerSeat } from 'components/room/PlayerSeat';

import { useStyles } from './RoomStyles';

const selectSortedPlayers = (players: any[], currentUserId: any) => {
  const currentPlayer = players.find(player => player.id === currentUserId);

  let sortedPlayers = [];

  /* 6 MAX */
  for (let i = 0; i < 6; i++) {
    const player = players.find(e => e.seatNo === i + 1);
    if (player) {
      sortedPlayers.push(player);
    } else {
      sortedPlayers.push({ seatNo: i + 1 });
    }
  }
  if (currentPlayer) {
    sortedPlayers = sortedPlayers
      .slice(currentPlayer.seatNo - 1, 10)
      .concat(sortedPlayers.slice(0, currentPlayer.seatNo - 1));
  }

  return sortedPlayers;
};

export const Room = () => {
  const classes = useStyles();
  const match: any = useRouteMatch();
  const tableId = match.params.id;
  const gameTable = useGameTableState();
  const { playerId } = usePlayerSessionState();
  const players = usePlayersState();

  const sortedPlayers = selectSortedPlayers(players, playerId);

  useChipChannel(tableId);
  useDealtCardChannel(tableId);
  useRoomViewerChannel(tableId);
  useSkyWay();

  if (!gameTable.isReady) return <Loading />;

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        {/* ネットワーク接続中のダイアログ */}
        <NetworkStatusDialog isOpen={gameTable.reconnectingActionCable} />

        {gameTable.tournament && gameTable.tournament.isFinished && <div>トーナメントは終了しました</div>}

        <Box className={classes.table}>
          {/* テーブル */}
          <GameTable heroPositionPlayer={sortedPlayers[0]} />

          {/* ボードのカード */}
          <BoardCard position={0} gameTable={gameTable} />
          <BoardCard position={1} gameTable={gameTable} />
          <BoardCard position={2} gameTable={gameTable} />
          <BoardCard position={3} gameTable={gameTable} />
          <BoardCard position={4} gameTable={gameTable} />

          {/* 各プレイヤーのシート */}
          <HeroSeat player={sortedPlayers[0]} tableId={tableId} />
          <PlayerSeat position={1} player={sortedPlayers[1]} tableId={tableId} />
          <PlayerSeat position={2} player={sortedPlayers[2]} tableId={tableId} />
          <PlayerSeat position={3} player={sortedPlayers[3]} tableId={tableId} />
          <PlayerSeat position={4} player={sortedPlayers[4]} tableId={tableId} />
          <PlayerSeat position={5} player={sortedPlayers[5]} tableId={tableId} />

          {/* 各プレイヤーのホールカード */}
          <PlayerHand position={0} player={sortedPlayers[0]} isHero={sortedPlayers[0].id === playerId} />
          <PlayerHand position={1} player={sortedPlayers[1]} />
          <PlayerHand position={2} player={sortedPlayers[2]} />
          <PlayerHand position={3} player={sortedPlayers[3]} />
          <PlayerHand position={4} player={sortedPlayers[4]} />
          <PlayerHand position={5} player={sortedPlayers[5]} />
        </Box>
      </div>
      <TableMessageDrawer tableId={tableId} />
    </div>
  );
};
