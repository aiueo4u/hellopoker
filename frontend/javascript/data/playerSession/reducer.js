const initialState = {
  isReady: false,
  isLoggedIn: false,
  nickname: null,
  playerId: null,
  profileImageUrl: null,
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
        profileImageUrl: action.profileImageUrl,
      };
    case 'FETCH_PLAYER_FAILED':
      return { ...state, isReady: true };
    default:
      return state;
  }
};

export default playerSession;
