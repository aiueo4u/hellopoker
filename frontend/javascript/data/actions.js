import { camelizeKeys } from 'humps';

export const dealtCardsReceived = data => ({ type: 'DEALT_CARD_RECEIVED', ...data });
export const playerActionReceived = data => {
  const camelizedData = camelizeKeys(data);

  return {
    ...camelizedData,
    type: 'BEFORE_PLAYER_ACTION_RECEIVED',
    round: data.gameHandState, // TODO,
  };
};
