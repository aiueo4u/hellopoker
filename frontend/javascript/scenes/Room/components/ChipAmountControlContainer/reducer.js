const initialState = {
  betSize: 0
};

const PlayerReducer = (state = initialState, action) => {
  const player = state;
  if (player.id !== action.playerId) {
    return player;
  }

  let betSize = 0;

  switch (action.type) {
    case 'OTHER_PLAYER_ACTION':
      return Object.assign({}, player, { actionType: action.actionType });
    case 'PROGRESS_PLAYER_ACTION_TIMER':
      return Object.assign({}, player, {
        remain_time_to_action: action.remainTimeToAction
      });
    case 'CHANGE_BET_AMOUNT':
      return Object.assign({}, player, { betSize: action.amount });
    case 'SET_BET_SIZE':
      betSize = action.amount;
      return Object.assign({}, player, { betSize });
    case 'RESET_BET_SIZE':
      return Object.assign({}, player, { betSize: 0 });
    case 'INCREMENT_BET_SIZE':
      betSize = (player.betSize || 0) + action.amount;
      if (action.playerStack < betSize) {
        betSize = action.playerStack;
      }
      return Object.assign({}, player, { betSize });
    case 'DECREMENT_BET_SIZE':
      betSize = (player.betSize || 0) - action.amount;
      if (betSize < 0) {
        betSize = 0;
      }
      return Object.assign({}, player, { betSize });
    case 'CHECK_ACTION':
      return Object.assign({}, player, {
        isFetching: true,
        isHiddenPanel: true
      });
    case 'CHECK_ACTION_COMPLETED':
      return Object.assign({}, player, { isFetching: false });
    case 'CHECK_ACTION_FAILED':
      return Object.assign({}, player, { isFetching: false });
    case 'BET_ACTION':
      return Object.assign({}, player, {
        isFetching: true,
        isHiddenPanel: true
      });
    case 'BET_ACTION_COMPLETED':
      return Object.assign({}, player, { isFetching: false });
    case 'BET_ACTION_FAILED':
      return Object.assign({}, player, { isFetching: false });
    case 'CALL_ACTION':
      return Object.assign({}, player, {
        isFetching: true,
        isHiddenPanel: true
      });
    case 'CALL_ACTION_COMPLETED':
      return Object.assign({}, player, { isFetching: false });
    case 'CALL_ACTION_FAILED':
      return Object.assign({}, player, { isFetching: false });
    case 'FOLD_ACTION':
      return Object.assign({}, player, {
        isFetching: true,
        isHiddenPanel: true
      });
    case 'FOLD_ACTION_COMPLETED':
      return Object.assign({}, player, { isFetching: false });
    case 'FOLD_ACTION_FAILED':
      return Object.assign({}, player, { isFetching: false });
    default:
      return player;
  }
};

const PlayersReducer = (state = [], action) => {
  switch (action.type) {
    case 'OTHER_PLAYER_ACTION':
      return state.map(player => {
        return PlayerReducer(player, action);
      });
    case 'PROGRESS_PLAYER_ACTION_TIMER':
      return state.map(player => {
        return PlayerReducer(player, action);
      });
    case 'PLAYER_ACTION_RECEIVED':
      return action.players;
    case 'SHOW_ACTIVE_PLAYER_CARDS':
      return state.map(player => {
        const actionPlayer = action.players.find(ap => ap.id === player.id);
        return {
          ...player,
          cards: actionPlayer.cards,
          hand_show: actionPlayer.hand_show,
          state: actionPlayer.state
        };
      });
    case 'CHANGE_BET_AMOUNT':
      return state.map(player => {
        return PlayerReducer(player, action);
      });
    case 'SET_BET_SIZE':
      return state.map(player => {
        return PlayerReducer(player, action);
      });
    case 'RESET_BET_SIZE':
      return state.map(player => {
        return PlayerReducer(player, action);
      });
    case 'INCREMENT_BET_SIZE':
      return state.map(player => {
        return PlayerReducer(player, action);
      });
    case 'DECREMENT_BET_SIZE':
      return state.map(player => {
        return PlayerReducer(player, action);
      });
    case 'CHECK_ACTION':
      return state.map(player => {
        return PlayerReducer(player, action);
      });
    case 'CHECK_ACTION_COMPLETED':
      return state.map(player => {
        return PlayerReducer(player, action);
      });
    case 'CHECK_ACTION_FAILED':
      return state.map(player => {
        return PlayerReducer(player, action);
      });
    case 'BET_ACTION':
      return state.map(player => {
        return PlayerReducer(player, action);
      });
    case 'BET_ACTION_COMPLETED':
      return state.map(player => {
        return PlayerReducer(player, action);
      });
    case 'BET_ACTION_FAILED':
      return state.map(player => {
        return PlayerReducer(player, action);
      });
    case 'CALL_ACTION':
      return state.map(player => {
        return PlayerReducer(player, action);
      });
    case 'CALL_ACTION_COMPLETED':
      return state.map(player => {
        return PlayerReducer(player, action);
      });
    case 'CALL_ACTION_FAILED':
      return state.map(player => {
        return PlayerReducer(player, action);
      });
    case 'FOLD_ACTION':
      return state.map(player => {
        return PlayerReducer(player, action);
      });
    case 'FOLD_ACTION_COMPLETED':
      return state.map(player => {
        return PlayerReducer(player, action);
      });
    case 'FOLD_ACTION_FAILED':
      return state.map(player => {
        return PlayerReducer(player, action);
      });
    default:
      return state;
  }
};

export default PlayersReducer;
