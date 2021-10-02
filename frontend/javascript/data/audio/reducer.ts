type Payload = {
  audioCall: string;
  audioMyTurn: any;
};

type Action = {
  type: string;
  payload: Payload;
};

export type AudioState = {
  isReady: boolean;
  audioCall: string | undefined;
  audioMyTurn: string | undefined;
  isMuted: boolean;
};

const initialState: AudioState = {
  isReady: false,
  audioCall: undefined,
  audioMyTurn: undefined,
  isMuted: false,
} as const;

export const audioReducer = (state: AudioState = initialState, action: Action): AudioState => {
  const { payload } = action;

  switch (action.type) {
    case 'INITIALIZED_AUDIO':
      return {
        ...state,
        isReady: true,
        audioCall: payload.audioCall,
        audioMyTurn: payload.audioMyTurn,
      };
    default:
      return state;
  }
};
