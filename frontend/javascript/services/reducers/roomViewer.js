const initialState = {
  isRoomViewer: false,
  cardsByPlayerId: {},
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case 'ON_RECEIVE_ROOM_VIEWER_CHANNEL':
      return { ...state, cardsByPlayerId: payload.cardsByPlayerId };
    case 'START_ROOM_VIEWING':
      return { ...state, isRoomViewer: true };
    default:
      return state;
  }
};

export default reducer;
