const initialState = {
  isReady: false,
  isLoggedIn: false,
  nickname: null,
  playerId: null,
  imageUrl: null,
};

const playerSession = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PLAYER_SUCCEEDED':
      return {
        ...state,
        isReady: true,
        isLoggedIn: true,
        nickname: action.nickname,
        playerId: action.playerId,
        imageUrl: action.imageUrl,
      };
    case 'FETCH_PLAYER_FAILED':
      return { ...state, isReady: true };
    default:
      return state;
  }
};

export default playerSession;
