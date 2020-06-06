import { camelizeKeys } from 'humps';

export const dealtCardsReceived = data => {
  const { cards, playerId } = data;
  return {
    type: 'DEALT_CARD_RECEIVED',
    cards,
    playerId,
  };
};

export const playerActionReceived = data => {
  const camelizedData = camelizeKeys(data);

  return {
    ...camelizedData,
    type: 'BEFORE_PLAYER_ACTION_RECEIVED',
    round: data.gameHandState, // TODO,
  };
};
