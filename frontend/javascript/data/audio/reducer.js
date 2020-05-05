const initialState = {
  isReady: false,
  audioCall: null,
  audioMyTurn: null,
  isMuted: false,
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;

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

export default reducer;
