import ActionCable from 'actioncable';
import { camelizeKeys } from 'humps';
import { eventChannel, END } from 'redux-saga';
import { all, cancelled, call, race, put, select, take, takeEvery } from 'redux-saga/effects';

import {
  fetchCurrentUser,
  actionToGameDealer,
  startToGameDealer,
  takeSeatToGameDealer,
  addNpcPlayer,
  postTest,
} from './api';

function* handleCheckAction(action) {
  const { tableId, playerId } = action;

  try {
    yield call(actionToGameDealer, 'PLAYER_ACTION_CHECK', tableId, playerId);
    yield put({ type: 'CHECK_ACTION_COMPLETED', tableId, playerId });
  } catch (error) {
    console.log(error);
    yield put({ type: 'CHECK_ACTION_FAILED', tableId, playerId });
  }
}

function* handleMuckHandAction(action) {
  const { tableId, playerId } = action;

  try {
    yield call(actionToGameDealer, 'PLAYER_ACTION_MUCK_HAND', tableId, playerId);
    yield put({ type: 'MUCK_HAND_ACTION_COMPLETED', tableId, playerId });
  } catch (error) {
    console.log(error);
    yield put({ type: 'MUCK_HAND_ACTION_FAILED', tableId, playerId });
  }
}

function* handleShowHandAction(action) {
  const { tableId, playerId } = action;

  try {
    yield call(actionToGameDealer, 'PLAYER_ACTION_SHOW_HAND', tableId, playerId);
    yield put({ type: 'SHOW_HAND_ACTION_COMPLETED', tableId, playerId });
  } catch (error) {
    console.log(error);
    yield put({ type: 'SHOW_HAND_ACTION_FAILED', tableId, playerId });
  }
}

function* handleFoldAction(action) {
  const { tableId, playerId } = action;

  try {
    yield call(actionToGameDealer, 'PLAYER_ACTION_FOLD', tableId, playerId);
    yield put({ type: 'FOLD_ACTION_COMPLETED', tableId, playerId });
  } catch (error) {
    console.log(error);
    yield put({ type: 'FOLD_ACTION_FAILED', tableId, playerId, error });
  }
}

function* handleCallAction(action) {
  const { tableId, playerId } = action;

  try {
    yield call(actionToGameDealer, 'PLAYER_ACTION_CALL', tableId, playerId);
    yield put({ type: 'CALL_ACTION_COMPLETED', tableId, playerId });
  } catch (error) {
    console.log(error);
    yield put({ type: 'CALL_ACTION_FAILED', tableId, playerId, error });
  }
}

function* handleBetAction(action) {
  const { tableId, playerId, amount } = action;

  try {
    const response = yield call(actionToGameDealer, 'PLAYER_ACTION_BET_CHIPS', tableId, playerId, amount);
    const { pot } = response.data;
    yield put({ type: 'BET_ACTION_COMPLETED', tableId, playerId, amount, pot });
  } catch (error) {
    console.log(error);
    yield put({ type: 'BET_ACTION_FAILED', tableId, playerId, error });
  }
}

function* handleTakePotAction(action) {
  const { tableId, playerId } = action;

  try {
    const response = yield call(actionToGameDealer, 'GAME_HAND_TAKE_POT', tableId, playerId);
    const { pot, playerStack } = camelizeKeys(response.data);
    yield put({
      type: 'TAKE_POT_ACTION_COMPLETED',
      tableId,
      playerId,
      pot,
      playerStack,
    });
  } catch (error) {
    console.log(error);
    yield put({ type: 'TAKE_POT_ACTION_FAILED', tableId, playerId, error });
  }
}

function* handlePlayerTakeSeat(action) {
  const { amount, tableId, playerId, seatNo, buyInAmount } = action;

  try {
    const response = yield call(takeSeatToGameDealer, tableId, playerId, seatNo, buyInAmount);
    const data = response.data;
    yield put({
      type: 'PLAYER_ACTION_TAKE_SEAT_COMPLETED',
      tableId,
      playerId,
      amount,
      pot: data.pot,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: 'PLAYER_ACTION_TAKE_SEAT_FAILED',
      tableId,
      playerId,
      error,
    });
  }
}

function* handleAddNpcPlayer(action) {
  const { tableId, seatNo } = action;

  try {
    yield call(addNpcPlayer, tableId, seatNo);
    yield put({ type: 'ON_SUCCESS_ADD_NPC_PLAYER' });
  } catch (error) {
    yield put({ type: 'ON_FAILURE_ADD_NPC_PLAYER' });
  }
}

function* handleFetchPlayer() {
  try {
    const response = yield call(fetchCurrentUser);
    const data = response.data;
    const user = camelizeKeys(data);
    yield put({ type: 'FETCH_PLAYER_SUCCEEDED', ...user });
  } catch (error) {
    // ログイン成功後のリダイレクト先を保存
    sessionStorage.setItem('redirectTo', window.location.href);
    yield put({ type: 'FETCH_PLAYER_FAILED' });
  }
}

function* handleGameStartButtonClicked(action) {
  const { tableId } = action;

  try {
    yield call(startToGameDealer, tableId);
    yield put({ type: 'GAME_START_COMPLETED', tableId });
  } catch (error) {
    console.log(error);
    yield put({ type: 'GAME_START_FAILED', tableId });
  }
}

function sleepTimer(seconds) {
  return eventChannel(emitter => {
    const iv = setInterval(() => {
      emitter(END);
    }, 1000 * seconds);

    return () => {
      clearInterval(iv);
    };
  });
}

function* openBoardCard(reachedRounds, boardCards, time) {
  try {
    const channel = yield call(sleepTimer, time);
    yield take(channel);
  } finally {
    yield put({
      type: 'OPEN_BOARD_CARD_BY_ROUND',
      reachedRounds,
      boardCards,
    });
  }
}

function* handleBeforePlayerActionReceived(action) {
  // ALLIN時のボードオープン用
  if (action.justActioned && action.reachingRounds.length > 0) {
    yield put({ type: 'SHOW_ACTIVE_PLAYER_CARDS', players: action.players });

    let reachedRounds = {};
    if (!action.reachingRounds.includes('flop')) {
      reachedRounds = {
        flop: action.reachingRounds.includes('turn') || action.reachingRounds.includes('river'),
        turn: !action.reachingRounds.includes('turn') && action.reachingRounds.includes('river'),
      };
      yield call(openBoardCard, reachedRounds, action.boardCards, 0);
    }
    yield all(
      action.reachingRounds.map((round, i) => {
        reachedRounds = Object.assign({}, reachedRounds);
        reachedRounds[round] = true;
        return call(openBoardCard, reachedRounds, action.boardCards, (i + 1) * 2);
      })
    );

    try {
      const channel = yield call(sleepTimer, 2);
      yield take(channel);
    } finally {
      yield put(Object.assign({}, action, { type: 'PLAYER_ACTION_RECEIVED' }));
      yield put({
        type: 'SETUP_GAME_START_TIMER',
        tableId: action.tableId,
        seconds: 10,
      });
      return;
    }
  }

  if (action.lastAction && action.lastAction.action_type !== 'blind' && action.lastAction.action_type !== 'taken') {
    yield put({
      type: 'OTHER_PLAYER_ACTION',
      actionType: action.lastAction.action_type,
      playerId: action.lastAction.player_id,
    });

    try {
      const channel = yield call(sleepTimer, 0.8);
      yield take(channel);
    } finally {
      const object = Object.assign({}, action, {
        type: 'PLAYER_ACTION_RECEIVED',
      });
      yield put(object);
      if (action.gameHandState === 'finished') {
        yield put({
          type: 'SETUP_GAME_START_TIMER',
          tableId: action.tableId,
          seconds: 10,
        });
      }
    }
  } else {
    const object = Object.assign({}, action, {
      type: 'PLAYER_ACTION_RECEIVED',
    });
    yield put(object);
    if (action.gameHandState === 'finished') {
      yield put({
        type: 'SETUP_GAME_START_TIMER',
        tableId: action.tableId,
        seconds: 10,
      });
    }
  }
}

function countdown(mSeconds) {
  return eventChannel(emitter => {
    const iv = setInterval(() => {
      mSeconds -= 1000;
      if (mSeconds <= 0) {
        emitter(END);
      }
    }, 1000);

    return () => {
      clearInterval(iv);
    };
  });
}

function* startCountdown(action) {
  const remain = action.seconds * 1000;
  const channel = yield call(countdown, remain);
  try {
    yield take(channel);
  } finally {
    if (yield cancelled()) {
      channel.close();
    } else {
      yield put({ type: 'GAME_START_BUTTON_CLICKED', tableId: action.tableId });
    }
  }
}

function* handleSetupGameStartTimer(action) {
  yield race([call(startCountdown, action), take('GAME_START_BUTTON_CLICKED'), take('PLAYER_ACTION_RECEIVED')]);
}

function* handleInitialize() {
  // ログイン前のページへとリダイレクトさせる
  const redirectTo = sessionStorage.getItem('redirectTo');
  sessionStorage.removeItem('redirectTo');
  if (redirectTo) {
    window.location = redirectTo;
  } else {
    yield put({ type: 'FETCH_PLAYER' });
  }
}

let localstream;
let remoteStreams = {};
let currentStreamPlayerId = null;

function* handleChangedPlayerTurn(action) {
  const { player } = action;

  const localVideo = document.getElementById('local-video');

  if (currentStreamPlayerId !== player.id) {
    currentStreamPlayerId = player.id;
    localVideo.srcObject = remoteStreams[player.id] || localstream;
  }
}

function* initializeWebRTC(action) {
  const { onSuccess } = action.payload;

  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: {
        width: {
          min: 320,
          max: 640,
        },
        height: {
          min: 240,
          max: 480,
        },
        frameRate: {
          min: 10,
          max: 30,
        },
      },
    })
    .then(stream => {
      localstream = stream;
      if (onSuccess) onSuccess();
    })
    .catch(error => console.log('Error!: ', error));
}

const jwt = localStorage.getItem('playerSession.jwt');
const cable = ActionCable.createConsumer(`/cable?jwt=${jwt}`);
let session;
let playerId;

function* handleJoinSession() {
  playerId = yield select(state => state.data.playerSession.playerId);
  playerId = `${playerId}`;

  const element = document.getElementById(`video-player-${playerId}`);
  element.id = `remoteVideoContainer+${playerId}`;
  element.autoplay = 'autoplay';
  element.srcObject = localstream;

  session = yield cable.subscriptions.create(
    { channel: 'TestChannel' },
    {
      connected: () => {
        console.log('ActionCable connected.');
        broadcastData({
          type: 'JOIN_ROOM',
          from: playerId,
        });
      },
      received: data => {
        if (data.from === playerId) return;
        console.log('ActionCable received: ', data);
        switch (data.type) {
          case 'JOIN_ROOM':
            return joinRoom(data);
          case 'EXCHANGE':
            if (data.to !== playerId) return;
            return exchange(data);
          case 'REMOVE_USER':
            return removeUser(data);
          default:
            return;
        }
      },
    }
  );
}

let pcPeers = {};

function handleLeaveSession() {
  for (const user in pcPeers) {
    pcPeers[user].close();
  }
  pcPeers = {};

  session.unsubscribe();

  const remoteVideoContainer = document.getElementById(`video-players-${playerId}`);
  remoteVideoContainer.innerHTML = '';

  broadcastData({
    type: 'REMOVE_USER',
    from: playerId,
  });
}

const joinRoom = data => {
  createPC(data.from, true);
};

const removeUser = data => {
  console.log('Removing user', data.from);
  const video = document.getElementById(`remoteVideoContainer+${data.from}`);
  video && video.remove();
  delete pcPeers[data.from];
};

const ice = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

function createPC(userId, isOffer) {
  const pc = new RTCPeerConnection(ice);
  pcPeers[userId] = pc;

  for (const track of localstream.getTracks()) {
    pc.addTrack(track, localstream);
  }

  isOffer &&
    pc
      .createOffer()
      .then(offer => {
        return pc.setLocalDescription(offer);
      })
      .then(() => {
        broadcastData({
          type: 'EXCHANGE',
          from: playerId,
          to: userId,
          sdp: JSON.stringify(pc.localDescription),
        });
      })
      .catch(logError);

  pc.onicecandidate = event => {
    event.candidate &&
      broadcastData({
        type: 'EXCHANGE',
        from: playerId,
        to: userId,
        candidate: JSON.stringify(event.candidate),
      });
  };

  pc.ontrack = event => {
    if (event.track.kind === 'video') {
      const element = document.getElementById(`video-player-${userId}`);
      element.id = `remoteVideoContainer+${userId}`;
      element.autoplay = 'autoplay';
      element.srcObject = event.streams[0];
      remoteStreams[userId] = event.streams[0];
    }
  };

  pc.oniceconnectionstatechange = event => {
    if (pc.iceConnectionState === 'disconnected') {
      console.log('Disconnected: ', userId);
      broadcastData({
        type: 'REMOVE_USER',
        from: userId,
      });
    }
  };

  return pc;
}

const exchange = data => {
  let pc;

  if (!pcPeers[data.from]) {
    pc = createPC(data.from, false);
  } else {
    pc = pcPeers[data.from];
  }

  if (data.candidate) {
    pc.addIceCandidate(new RTCIceCandidate(JSON.parse(data.candidate)))
      .then(() => console.log('Ice candidate added'))
      .catch(logError);
  }

  if (data.sdp) {
    const sdp = JSON.parse(data.sdp);
    pc.setRemoteDescription(new RTCSessionDescription(sdp))
      .then(() => {
        if (sdp.type === 'offer') {
          pc.createAnswer()
            .then(answer => {
              return pc.setLocalDescription(answer);
            })
            .then(() => {
              broadcastData({
                type: 'EXCHANGE',
                from: playerId,
                to: data.from,
                sdp: JSON.stringify(pc.localDescription),
              });
            });
        }
      })
      .catch(logError);
  }
};

function broadcastData(data) {
  postTest(data);
}

const logError = error => console.log(error);

export default function* rootSage() {
  yield takeEvery('FETCH_PLAYER', handleFetchPlayer);
  yield takeEvery('BET_ACTION', handleBetAction);
  yield takeEvery('CALL_ACTION', handleCallAction);
  yield takeEvery('FOLD_ACTION', handleFoldAction);
  yield takeEvery('CHECK_ACTION', handleCheckAction);
  yield takeEvery('MUCK_HAND_ACTION', handleMuckHandAction);
  yield takeEvery('SHOW_HAND_ACTION', handleShowHandAction);
  yield takeEvery('GAME_START_BUTTON_CLICKED', handleGameStartButtonClicked);
  yield takeEvery('TAKE_POT_ACTION', handleTakePotAction);
  yield takeEvery('PLAYER_TAKE_SEAT', handlePlayerTakeSeat);
  yield takeEvery('ADD_NPC_PLAYER', handleAddNpcPlayer);
  yield takeEvery('BEFORE_PLAYER_ACTION_RECEIVED', handleBeforePlayerActionReceived);

  // TODO: 観戦時にはこれを無効にしたい
  yield takeEvery('SETUP_GAME_START_TIMER', handleSetupGameStartTimer);

  yield call(handleInitialize);

  yield takeEvery('HANDLE_JOIN_SESSION', handleJoinSession);
  //yield takeEvery("HANDLE_LEAVE_SESSION", handleLeaveSession);
  yield takeEvery('INITIALIZE_WEBRTC', initializeWebRTC);
  //yield takeEvery('CHANGED_PLAYER_TURN', handleChangedPlayerTurn);
}
