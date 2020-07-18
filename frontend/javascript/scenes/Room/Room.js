import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import Loading from 'components/Loading';
import NetworkStatusDialog from 'components/NetworkStatusDialog';
import TableMessageDrawer from 'components/TableMessageDrawer';

import useChipChannel from 'hooks/useChipChannel';
import useDealtCardChannel from 'hooks/useDealtCardChannel';
import useGameTableState from 'hooks/useGameTableState';
import useInitializeAudio from 'hooks/useInitializeAudio';
import usePlayerSessionState from 'hooks/usePlayerSessionState';
import usePlayersState from 'hooks/usePlayersState';
import useRoomViewerChannel from 'hooks/useRoomViewerChannel';

import PlayerHand from './components/PlayerHand';
import GameTable from './components/GameTable';
import HeroSeat from './components/HeroSeat';
import PlayerSeat from './components/PlayerSeat';
import BoardCard from './components/BoardCard';
import WelcomeDialog from './components/WelcomeDialog';
import useRoom from './hooks/useRoom';
import useStyles from './RoomStyles';
import selectSortedPlayers from './selectors/selectSortedPlayers';

const Room = () => {
  const classes = useStyles();
  const match = useRouteMatch();
  const tableId = match.params.id;
  const gameTable = useGameTableState();
  const { playerId } = usePlayerSessionState();
  const players = usePlayersState();
  const [initializeAudio] = useInitializeAudio();

  const sortedPlayers = selectSortedPlayers(players, playerId);

  const { isOpenWelcomeDialog, enterRoomAsViewer, enterRoomAsPlayer } = useRoom();
  useChipChannel(tableId);
  useDealtCardChannel(tableId);
  useRoomViewerChannel(tableId);

  if (!gameTable.isReady) return <Loading />;

  return (
    <div className={classes.background}>
      <div className={classes.container} onClick={initializeAudio}>
        {/* ネットワーク接続中のダイアログ */}
        <NetworkStatusDialog isOpen={gameTable.reconnectingActionCable} />

        {/* WebRTC接続確認ダイアログ */}
        <WelcomeDialog
          isOpen={isOpenWelcomeDialog}
          enterRoomAsViewer={enterRoomAsViewer}
          enterRoomAsPlayer={enterRoomAsPlayer}
        />

        <Box className={classes.table}>
          <GameTable heroPositionPlayer={sortedPlayers[0]} />
          <BoardCard position={0} gameTable={gameTable} />
          <BoardCard position={1} gameTable={gameTable} />
          <BoardCard position={2} gameTable={gameTable} />
          <BoardCard position={3} gameTable={gameTable} />
          <BoardCard position={4} gameTable={gameTable} />

          <HeroSeat position={0} player={sortedPlayers[0]} tableId={tableId} />
          <PlayerSeat position={1} player={sortedPlayers[1]} tableId={tableId} />
          <PlayerSeat position={2} player={sortedPlayers[2]} tableId={tableId} />
          <PlayerSeat position={3} player={sortedPlayers[3]} tableId={tableId} />
          <PlayerSeat position={4} player={sortedPlayers[4]} tableId={tableId} />
          <PlayerSeat position={5} player={sortedPlayers[5]} tableId={tableId} />

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

export default Room;
