import { tableMessageSaga } from 'ducks/tableMessage';
import { webRTCSaga } from 'ducks/webRTC';
import { camelizeKeys } from 'humps';
import { eventChannel, END } from 'redux-saga';
import { all, cancelled, call, fork, race, put, select, take, takeEvery } from 'redux-saga/effects';

import { nameByActionType } from 'helpers/actionType';

import { fetchCurrentUser, startToGameDealer, takeSeatToGameDealer, addNpcPlayer } from './api';

function* handlePlayerTakeSeat(action) {
  const { amount, tableId, playerId, seatNo, buyInAmount } = action;

  try {
    const response = yield call(takeSeatToGameDealer, tableId, playerId, seatNo, buyInAmount);
    const { data } = response;
    yield put({
      type: 'PLAYER_ACTION_TAKE_SEAT_COMPLETED',
      tableId,
      playerId,
      amount,
      pot: data.pot,
    });
  } catch (error) {
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
    const { data } = response;
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
    yield put({ type: 'GAME_START_FAILED', tableId });
  }
}

function* openBoardCard(reachedRounds, boardCards, time) {
  yield call(sleep, time * 1000);
  yield put({
    type: 'OPEN_BOARD_CARD_BY_ROUND',
    reachedRounds,
    boardCards,
  });
}

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

function* handleBeforePlayerActionReceived(action) {
  const { boardCards, gameHandState, lastAction, justActioned, reachingRounds, players, tableId, tournament } = action;

  // プレイヤーのアクション名を表示
  if (lastAction && nameByActionType[lastAction.actionType]) {
    const playerSession = yield select(state => state.data.playerSession);

    yield put({
      type: 'OTHER_PLAYER_ACTION',
      actionType: lastAction.actionType,
      playerId: lastAction.playerId,
    });

    // 自分以外のアクションの場合は少し表示したままにする
    if (lastAction.playerId !== playerSession.playerId) {
      yield call(sleep, 500);
    }
  }

  // ALLIN時のボードオープン用
  if (justActioned && reachingRounds.length > 0) {
    // 対決するプレイヤーのハンドをオープン
    yield put({ type: 'SHOW_ACTIVE_PLAYER_CARDS', players });

    let reachedRounds = {};
    if (!reachingRounds.includes('flop')) {
      reachedRounds = {
        flop: reachingRounds.includes('turn') || reachingRounds.includes('river'),
        turn: !reachingRounds.includes('turn') && reachingRounds.includes('river'),
      };
      yield call(openBoardCard, reachedRounds, boardCards, 0);
    }

    // 一枚ずつカードをオープンしていくやつ
    yield all(
      reachingRounds.map((round, i) => {
        reachedRounds = { ...reachedRounds, [round]: true };
        return call(openBoardCard, reachedRounds, boardCards, (i + 1) * 2);
      })
    );
    yield call(sleep, 2000); // オープンし終わったら少し余韻を残す
  }

  // 全体情報をグローバルステートに反映してアクション名の表示終了
  yield put({ ...action, type: 'PLAYER_ACTION_RECEIVED' });

  // ゲーム終了なら次ゲームの自動開始タイマーをセット
  if (gameHandState === 'finished') {
    yield put({
      type: 'SETUP_GAME_START_TIMER',
      tableId,
      seconds: tournament ? 5 : 5,
    });
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

export default function* rootSage() {
  yield takeEvery('FETCH_PLAYER', handleFetchPlayer);
  yield takeEvery('GAME_START_BUTTON_CLICKED', handleGameStartButtonClicked);
  yield takeEvery('PLAYER_TAKE_SEAT', handlePlayerTakeSeat);
  yield takeEvery('ADD_NPC_PLAYER', handleAddNpcPlayer);
  yield takeEvery('BEFORE_PLAYER_ACTION_RECEIVED', handleBeforePlayerActionReceived);

  // TODO: 観戦時にはこれを無効にしたい
  yield takeEvery('SETUP_GAME_START_TIMER', handleSetupGameStartTimer);

  yield all([...webRTCSaga]);
  yield fork(tableMessageSaga);
}
