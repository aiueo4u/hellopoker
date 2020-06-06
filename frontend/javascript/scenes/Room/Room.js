import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import PlayerActions from 'components/PlayerActions';
import Loading from 'components/Loading';
import NetworkStatusDialog from 'components/NetworkStatusDialog';
import TopInfobar from 'components/TopInfobar';
import TopTitlebar from 'components/TopTitlebar';

import useChipChannel from 'hooks/useChipChannel';
import useDealtCardChannel from 'hooks/useDealtCardChannel';
import useGameTableState from 'hooks/useGameTableState';
import useInitializeAudio from 'hooks/useInitializeAudio';
import usePlayerSessionState from 'hooks/usePlayerSessionState';
import usePlayersState from 'hooks/usePlayersState';

import GameTable from './components/GameTable';
import HeroSeat from './components/HeroSeat';
import PlayerSeat from './components/PlayerSeat';
import useStyles from './RoomStyles';
import selectSortedPlayers from './selectors/selectSortedPlayers';

const Room = () => {
  const classes = useStyles();
  const match = useRouteMatch();
  const tableId = match.params.id;
  const gameTable = useGameTableState();
  const playerSession = usePlayerSessionState();
  const players = usePlayersState();
  const [initializeAudio] = useInitializeAudio();
  const currentPlayer = players.find(player => player.id === playerSession.playerId);
  const isShowInformationBar = (gameTable.inGame || players.length > 1) && gameTable.round !== 'init';

  const sortedPlayers = selectSortedPlayers(players, playerSession.playerId);

  useChipChannel(tableId);
  useDealtCardChannel(tableId);

  if (!gameTable.isReady) return <Loading />;

  return (
    <div className={classes.background}>
      <div className={classes.container} onClick={initializeAudio}>
        {/* ネットワーク接続中のダイアログ */}
        <NetworkStatusDialog isOpen={gameTable.reconnectingActionCable} />

        {
          /* 画面左上のタイトルバー */
          <TopTitlebar gameTable={gameTable} />
        }

        {/* 画面右上部の情報バー */
        isShowInformationBar && <TopInfobar handCount={gameTable.gameHandCount} round={gameTable.round} />}

        <Box className={classes.table}>
          <GameTable gameTable={gameTable} players={players} playerSession={playerSession} tableId={tableId} />

          <HeroSeat position={0} player={sortedPlayers[0]} tableId={tableId} />
          <PlayerSeat position={1} player={sortedPlayers[1]} tableId={tableId} />
          <PlayerSeat position={2} player={sortedPlayers[2]} tableId={tableId} />
          <PlayerSeat position={3} player={sortedPlayers[3]} tableId={tableId} />
          <PlayerSeat position={4} player={sortedPlayers[4]} tableId={tableId} />
          <PlayerSeat position={5} player={sortedPlayers[5]} tableId={tableId} />
        </Box>
        <Box className={classes.action}>
          <PlayerActions tableId={tableId} player={currentPlayer} />
        </Box>
      </div>
    </div>
  );
};

export default Room;
