type RoomViewerState = {
  isRoomViewer: boolean;
  cardsByPlayerId: any;
};

type Payload = {
  cardsByPlayerId: any;
};
type Action = {
  type: 'ON_RECEIVE_ROOM_VIEWER_CHANNEL' | 'START_ROOM_VIEWING';
  payload: Payload;
};
const initialState: RoomViewerState = {
  isRoomViewer: false,
  cardsByPlayerId: {},
} as const;

export const roomViewerReducer = (state: RoomViewerState = initialState, action: Action): RoomViewerState => {
  const { payload } = action;

  switch (action.type) {
    case 'ON_RECEIVE_ROOM_VIEWER_CHANNEL':
      return { ...state, cardsByPlayerId: payload.cardsByPlayerId };
    case 'START_ROOM_VIEWING':
      return { ...state, isRoomViewer: true };
    default:
      return state;
  }
};
