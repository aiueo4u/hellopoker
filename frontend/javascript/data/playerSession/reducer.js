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
      return Object.assign({}, state, {
        isReady: true,
        isLoggedIn: true,
        nickname: action.nickname,
        playerId: action.playerId,
        imageUrl: action.imageUrl,
      });
    case 'FETCH_PLAYER_FAILED':
      return Object.assign({}, state, { isReady: true });
    case 'LOGIN_FORM_ON_SUBMIT':
      return Object.assign({}, state, { isFetching: true });
    case 'LOGIN_FORM_ON_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        isLoggedIn: true,
        nickname: action.nickname,
        playerId: action.playerId,
      });
    default:
      return state;
  }
};

export default playerSession;
