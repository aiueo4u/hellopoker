type State = {
  peer: any;
  sfuRoom: any;
  isPeerOpen: boolean;
  streamByPlayerId: any;
  isVideoEnabledByPlayerId: {};
  isAudioEnabledByPlayerId: {};
};

type Payload = {
  playerId: number;
  stream: any;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  sfuRoom: any;
  peer: any;
};

type Action = {
  type:
    | 'CLOSE_PEER_CONNECTION'
    | 'DISABLE_MIC_AUDIO'
    | 'DISABLE_VIDEO'
    | 'ENABLE_MIC_AUDIO'
    | 'ENABLE_VIDEO'
    | 'LEAVE_ROOM'
    | 'LEAVE_SFU_ROOM'
    | 'ON_SUCCESS_GET_MEDIA_STREAM'
    | 'ON_SUCCESS_JOIN_SFU_ROOM'
    | 'ON_SUCCESS_OPEN_PEER_CONNECTION';
  payload: Payload;
};

const initialState = {
  peer: null,
  sfuRoom: null,
  isPeerOpen: false,
  streamByPlayerId: {},
  isVideoEnabledByPlayerId: {},
  isAudioEnabledByPlayerId: {},
};

const reducer = (state: State = initialState, action: Action): State => {
  const payload = action.payload || {};

  switch (action.type) {
    case 'CLOSE_PEER_CONNECTION':
      return { ...state, peer: null, isPeerOpen: false };
    case 'DISABLE_MIC_AUDIO':
      return {
        ...state,
        isAudioEnabledByPlayerId: {
          ...state.isAudioEnabledByPlayerId,
          [payload.playerId]: false,
        },
      };
    case 'DISABLE_VIDEO':
      return {
        ...state,
        isVideoEnabledByPlayerId: {
          ...state.isVideoEnabledByPlayerId,
          [payload.playerId]: false,
        },
      };
    case 'ENABLE_MIC_AUDIO':
      return {
        ...state,
        isAudioEnabledByPlayerId: {
          ...state.isAudioEnabledByPlayerId,
          [payload.playerId]: true,
        },
      };
    case 'ENABLE_VIDEO':
      return {
        ...state,
        isVideoEnabledByPlayerId: {
          ...state.isVideoEnabledByPlayerId,
          [payload.playerId]: true,
        },
      };
    case 'LEAVE_ROOM':
      return initialState;
    case 'LEAVE_SFU_ROOM':
      return { ...state, sfuRoom: null };
    case 'ON_SUCCESS_GET_MEDIA_STREAM':
      return {
        ...state,
        streamByPlayerId: {
          ...state.streamByPlayerId,
          [payload.playerId]: payload.stream,
        },
        isVideoEnabledByPlayerId: {
          ...state.isVideoEnabledByPlayerId,
          [payload.playerId]: payload.isVideoEnabled,
        },
        isAudioEnabledByPlayerId: {
          ...state.isAudioEnabledByPlayerId,
          [payload.playerId]: payload.isAudioEnabled,
        },
      };
    case 'ON_SUCCESS_JOIN_SFU_ROOM':
      return { ...state, sfuRoom: payload.sfuRoom };
    case 'ON_SUCCESS_OPEN_PEER_CONNECTION':
      return { ...state, peer: payload.peer, isPeerOpen: true };
    default:
      return state;
  }
};

export default reducer;
