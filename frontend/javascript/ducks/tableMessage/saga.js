import { cancel, call, fork, put, take } from 'redux-saga/effects';

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

function* handleReceiveTableMessage(action) {
  const payload = action.payload;

  yield call(sleep, 3000);
  yield put({ type: 'DISMISS_TABLE_MESSAGE', payload });
}

function* main() {
  let task;
  while (true) {
    const action = yield take('RECEIVE_TABLE_MESSAGE');
    if (task && task.isRunning()) {
      yield cancel(task);
    }

    task = yield fork(handleReceiveTableMessage, action);
  }
}

export default main;
