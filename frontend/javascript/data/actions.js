export const dealtCardsReceived = data => ({ type: 'DEALT_CARD_RECEIVED', ...data });
export const playerActionReceived = data => ({
  ...data,
  type: 'BEFORE_PLAYER_ACTION_RECEIVED',
  round: data.gameHandState, // TODO,
});
export const onReceiveRoomViewerChannel = payload => ({ type: 'ON_RECEIVE_ROOM_VIEWER_CHANNEL', payload });
export const startRoomViewing = () => ({ type: 'START_ROOM_VIEWING' });
