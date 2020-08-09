const initialState = {
  balloonMessageByPlayerId: {},
  isOpenBalloonByPlayerId: {},
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case 'DISMISS_TABLE_MESSAGE':
      return {
        ...state,
        balloonMessageByPlayerId: {
          ...state.balloonMessageByPlayerId,
          [payload.message.player.id]: '',
        },
        isOpenBalloonByPlayerId: {
          ...state.isOpenBalloonByPlayerId,
          [payload.message.player.id]: false,
        },
      };
    case 'RECEIVE_TABLE_MESSAGE':
      return {
        ...state,
        balloonMessageByPlayerId: {
          ...state.balloonMessageByPlayerId,
          [payload.message.player.id]: payload.message,
        },
        isOpenBalloonByPlayerId: {
          ...state.isOpenBalloonByPlayerId,
          [payload.message.player.id]: true,
        },
      };
    default:
      return state;
  }
};

export default reducer;
