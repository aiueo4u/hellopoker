const initialState = {
  actionType: null,
  betSize: 0,
  isFetching: false,
};

const PlayerReducer = (state = initialState, action) => {
  const player = state;

  if (player.id !== action.playerId) return player;

  let betSize = 0;

  switch (action.type) {
    case 'OTHER_PLAYER_ACTION':
      return { ...player, actionType: action.actionType };
    case 'RESET_BET_SIZE':
      return { ...player, betSize: 0 };
    case 'INCREMENT_BET_SIZE':
      betSize = (player.betSize || 0) + action.amount;
      if (action.playerStack < betSize) {
        betSize = action.playerStack;
      }
      return { ...player, betSize };
    case 'DECREMENT_BET_SIZE':
      betSize = (player.betSize || 0) - action.amount;
      if (betSize < 0) {
        betSize = 0;
      }
      return { ...player, betSize };
    case 'CHECK_ACTION_COMPLETED':
    case 'CHECK_ACTION_FAILED':
    case 'BET_ACTION_COMPLETED':
    case 'BET_ACTION_FAILED':
    case 'CALL_ACTION_COMPLETED':
    case 'CALL_ACTION_FAILED':
    case 'FOLD_ACTION_COMPLETED':
    case 'FOLD_ACTION_FAILED':
      return { ...player, isFetching: false };
    case 'BET_ACTION':
    case 'CALL_ACTION':
    case 'FOLD_ACTION':
    case 'CHECK_ACTION':
      return {
        ...player,
        isFetching: true,
      };
    default:
      return player;
  }
};

const PlayersReducer = (state = [], action) => {
  switch (action.type) {
    case 'PLAYER_ACTION_RECEIVED':
      return action.players;
    case 'SHOW_ACTIVE_PLAYER_CARDS':
      return state.map(player => {
        const actionPlayer = action.players.find(ap => ap.id === player.id);
        return {
          ...player,
          cards: actionPlayer.cards,
          hand_show: actionPlayer.hand_show,
          state: actionPlayer.state,
        };
      });
    default:
      return state.map(player => PlayerReducer(player, action));
  }
};

export default PlayersReducer;
