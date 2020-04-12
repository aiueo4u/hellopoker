import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomCircularProgress from 'components/CustomCircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import ActionCable from 'actioncable';

import Loading from 'components/Loading';
import TopInfobar from 'components/TopInfobar';
import {
  betAction,
  playerActionReceived,
  gameHandActionReceived,
  gameHandFinishedReceived,
  dealtCardsReceived,
} from './data/actions.js';
import ChipAmountControlContainer from './components/ChipAmountControlContainer';

import GameTable from './components/GameTable';

const gameStartButtonClicked = tableId => {
  return { type: 'GAME_START_BUTTON_CLICKED', tableId };
};

const gameStartable = gameHandState => {
  return (
    !gameHandState || gameHandState === 'finished' || gameHandState === 'init'
  );
};

class Room extends Component {
  componentDidMount() {
    const {
      onActionCableConnected,
      onActionCableDisconnected,
      match,
      onGameHandFinishedReceived,
      onGameHandActionReceived,
      onPlayerActionReceived,
      onDealtCardsReceived
    } = this.props;

    // action cable setup
    this.App || (this.App = {});
    this.App.cable = ActionCable.createConsumer(`/cable`);

    const tableId = match.params.id;

    // TODO: create失敗のエラーハンドリングはどうやるんだろう。。
    this.App.ChipChannel = this.App.cable.subscriptions.create(
      { channel: 'ChipChannel', tableId },
      {
        connected() {
          // console.debug('Chip Channel connected');

          onActionCableConnected();
        },
        disconnected() {
          // console.debug('Chip Channel disconnected');
          onActionCableDisconnected();
        },
        received(data) {
          // console.debug('Chip Channel received', data);
          if (data.type === 'player_action') {
            onPlayerActionReceived(data);
          } else if (data.type === 'game_hand') {
            onGameHandActionReceived(data);
          } else if (data.type === 'game_hand_finished') {
            onGameHandFinishedReceived(data);
          }
        },
        rejected(data) {
          // console.debug('Chip Channel rejected', data);
        },
      }
    );

    // 配られるカード専用のチャンネル
    this.App.cable_for_dealt_card = ActionCable.createConsumer(`/cable`);
    this.App.DealtCardChannel = this.App.cable_for_dealt_card.subscriptions.create(
      {
        channel: 'DealtCardChannel',
        tableId,
      },
      {
        connected() {
          //console.debug('DealtCardChannel connected');
        },
        disconnected() {
          //console.debug('DealtCardChannel disconnected');
        },
        received(data) {
          //console.debug('DealtCardChannel received: ', data);
          onDealtCardsReceived(data);
        },
        rejected(data) {
          //console.debug('DealtCardChannel rejected', data);
        }
      }
    );

    // iOS Safariのボトムバー対応
    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.01;
      window.document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    const vh = window.innerHeight * 0.01;
    window.document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  componentWillUnmount() {
    this.App.ChipChannel.unsubscribe();
    this.App.DealtCardChannel.unsubscribe();
  }

  render() {
    const {
      gameTable,
      playerSession,
      // informationItems,
      onGameStart,
      players,
      tableId,
      tableName,
      onBetAction
    } = this.props;

    const isSeated = players.find(
      player => player.id === playerSession.playerId
    )
      ? true
      : false;
    const inGame = !gameStartable(gameTable.gameHandState);

    const currentPlayer = players.find(
      player => player.id === playerSession.playerId
    );

    /* ゲームデータのローディング */
    if (!gameTable.isReady) {
      return <Loading />;
    }

    return (
      <div
        id='baseWrapper'
        style={{
          background: '#003300'
        }}
      >
        {/* ネットワーク接続中のダイアログ */}
        <Dialog open={gameTable.reconnectingActionCable}>
          <DialogTitle>再接続中・・・</DialogTitle>
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
          </div>
        </Dialog>

        {/* 画面右上部の情報バー */
        (inGame || players.length > 1) && gameTable.round !== 'init' && (
          <TopInfobar
            handCount={gameTable.gameHandCount}
            round={gameTable.round}
          />
        )}

        <Box
          display='flex'
          height='100%'
          flexDirection='column'
          alignItems='center'
        >
          <div style={{ height: 'calc(100% - 80px)', width: '100%' }}>
            <GameTable
              tableName={tableName}
              tableId={tableId}
              onGameStart={onGameStart}
              players={players}
              playerSession={playerSession}
              isSeated={isSeated}
              inGame={inGame}
              gameTable={gameTable}
              onBetAction={onBetAction}
            />
          </div>

          {/* チップ量調整エリア */}
          <div style={{ height: '80px', maxWidth: '640px', width: '100%' }}>
            {currentPlayer &&
              inGame &&
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
  }
}

const mapStateToProps = (state, ownProps) => {
  const { Room } = state.scenes.Tables;
  const tableId = ownProps.match.params.id;

  return {
    tableId,
    tableName: tableId, // TODO
    players: Room.Players,
    playerSession: state.data.playerSession,
    gameTable: Room.GameTable,
    onBetAction: (playerId, amount) => {
      return betAction(tableId, playerId, amount);
    }
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const tableId = ownProps.match.params.id;

  return {
    onGameHandFinishedReceived: data => {
      dispatch(gameHandFinishedReceived());
    },
    onGameHandActionReceived: data => {
      dispatch(gameHandActionReceived(data.pot, data.players));
    },
    onPlayerActionReceived: data => {
      dispatch(playerActionReceived(data));
    },
    onDealtCardsReceived: data => {
      dispatch(dealtCardsReceived(data));
    },
    onGameStart: () => {
      dispatch(gameStartButtonClicked(tableId));
    },
    onActionCableConnected: () => {
      dispatch({ type: 'ACTION_CABLE_CONNECTED' });
    },
    onActionCableDisconnected: () => {
      dispatch({ type: 'ACTION_CABLE_DISCONNECTED' });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);
