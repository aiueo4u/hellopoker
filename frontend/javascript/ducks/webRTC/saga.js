import { select, takeEvery } from 'redux-saga/effects';

// const getWebRTCState = state => state.webRTC;
const getStream = playerId => state => state.webRTC.streamByPlayerId[playerId];

function* handleDisableMicAudio(action) {
  const { playerId } = action.payload;
  const stream = yield select(getStream(playerId));
  if (stream) stream.getAudioTracks().forEach(track => (track.enabled = false));
}

function* handleDisableVideo(action) {
  const { playerId } = action.payload;
  const stream = yield select(getStream(playerId));
  if (stream) stream.getVideoTracks().forEach(track => (track.enabled = false));
}

function* handleEnableMicAudio(action) {
  const { playerId } = action.payload;
  const stream = yield select(getStream(playerId));
  if (stream) stream.getAudioTracks().forEach(track => (track.enabled = true));
}

function* handleEnableVideo(action) {
  const { playerId } = action.payload;
  const stream = yield select(getStream(playerId));
  if (stream) stream.getVideoTracks().forEach(track => (track.enabled = true));
}

const sagas = [
  takeEvery('DISABLE_MIC_AUDIO', handleDisableMicAudio),
  takeEvery('DISABLE_VIDEO', handleDisableVideo),
  takeEvery('ENABLE_MIC_AUDIO', handleEnableMicAudio),
  takeEvery('ENABLE_VIDEO', handleEnableVideo),
];

export default sagas;
