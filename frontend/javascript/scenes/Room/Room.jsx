import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import CustomCircularProgress from 'components/CustomCircularProgress';

import Loading from 'components/Loading';
import TopInfobar from 'components/TopInfobar';

import useChipChannel from 'hooks/useChipChannel';
import useDealtCardChannel from 'hooks/useDealtCardChannel';
import useGameTableState from 'hooks/useGameTableState';
import usePlayerSessionState from 'hooks/usePlayerSessionState';
import usePlayersState from 'hooks/usePlayersState';

import ChipAmountControlContainer from './components/ChipAmountControlContainer';
import GameTable from './components/GameTable';
import NetworkStatusDialog from './components/NetworkStatusDialog';
import useStyles from './RoomStyles';

const gameStartable = gameHandState => {
  return !gameHandState || gameHandState === 'finished' || gameHandState === 'init';
};

const Room = () => {
  const classes = useStyles();
  const match = useRouteMatch();
  const tableId = match.params.id;
  const gameTable = useGameTableState();
  const playerSession = usePlayerSessionState();
  const players = usePlayersState();
  const currentPlayer = players.find(player => player.id === playerSession.playerId);
  const isShowInformationBar = (gameTable.inGame || players.length > 1) && gameTable.round !== 'init';

  useChipChannel(tableId);
  useDealtCardChannel(tableId);

  if (!gameTable.isReady) return <Loading />;

  return (
    <div className={classes.container}>
      {/* ネットワーク接続中のダイアログ */}
      <NetworkStatusDialog isOpen={gameTable.reconnectingActionCable} />

      {/* 画面右上部の情報バー */
      isShowInformationBar && <TopInfobar handCount={gameTable.gameHandCount} round={gameTable.round} />}

      <Box display="flex" height="100%" flexDirection="column" alignItems="center">
        <div style={{ height: 'calc(100% - 80px)', width: '100%' }}>
          <GameTable gameTable={gameTable} players={players} playerSession={playerSession} tableId={tableId} />
        </div>

        {/* チップ量調整エリア */}
        <div style={{ height: '80px', maxWidth: '640px', width: '100%' }}>
          {currentPlayer &&
            gameTable.inGame &&
            !gameTable.showOrMuck &&
            gameTable.currentSeatNo === currentPlayer.seat_no &&
            (currentPlayer.isFetching ? (
              <CustomCircularProgress />
            ) : (
              !currentPlayer.isHiddenPanel && <ChipAmountControlContainer />
            ))}
        </div>
      </Box>
    </div>
  );
};

export default Room;
