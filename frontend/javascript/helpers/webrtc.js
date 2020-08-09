export const buildPeerId = playerId => {
  const date = new Date();
  return `${playerId}-${date.getTime()}`;
};

export const parsePeerId = peerId => {
  const [playerId] = peerId.split('-');
  return { playerId };
};

export const buildRoomName = tableId => tableId;
