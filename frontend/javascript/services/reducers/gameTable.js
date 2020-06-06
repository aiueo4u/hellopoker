const initialState = {
  openingPlayerMenuDialogPlayerId: null,
  isReady: false,
  pot: 0,
  reconnectingActionCable: false,
  dealtCards: [],
  buyInAmount: '',
  isOpenGameStartCountdown: false,
  timeToStart: 0,
  table: {},
};

const GameTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SETUP_GAME_START_TIMER':
      return {
        ...state,
        isOpenGameStartCountdown: true,
        timeToStart: action.seconds,
      };
    case 'GAME_START_COMPLETED':
      return { ...state, isOpenGameStartCountdown: false };
    case 'ON_CHANGE_BUY_IN_AMOUNT':
      return Object.assign({}, state, {
        buyInAmount: action.amount,
      });
    case 'DEALT_CARD_RECEIVED':
      return {
        ...state,
        isOpenGameStartCountdown: false,
        dealtCards: {
          ...state.dealtCards,
          [action.playerId]: action.cards,
        },
      };
    case 'OPEN_BOARD_CARD_BY_ROUND':
      return Object.assign({}, state, {
        reachedRounds: action.reachedRounds,
        boardCards: action.boardCards,
      });
    case 'PLAYER_ACTION_RECEIVED':
      return { ...state, ...action, isReady: true };
    case 'OPEN_PLAYER_MENU_DIALOG':
      return Object.assign({}, state, {
        openingPlayerMenuDialogPlayerId: action.playerId,
      });
    case 'CLOSE_PLAYER_MENU_DIALOG':
      return Object.assign({}, state, {
        openingPlayerMenuDialogPlayerId: null,
      });
    case 'OPEN_BUY_IN_DIALOG':
      return Object.assign({}, state, {
        isOpenedBuyInDialog: true,
        selectingSeatNo: action.seatNo,
        buyInPlayerId: action.playerId,
      });
    case 'CLOSE_BUY_IN_DIALOG':
      return Object.assign({}, state, {
        isOpenedBuyInDialog: false,
        selectingSeatNo: null,
        buyInAmount: '',
      });
    case 'PLAYER_TAKE_SEAT':
      return Object.assign({}, state, {
        buyInAmount: '',
      });
    case 'PLAYER_ACTION_TAKE_SEAT_COMPLETED':
      return Object.assign({}, state, {
        isOpenedBuyInDialog: false,
        selectingSeatNo: null,
      });
    case 'PLAYER_ACTION_TAKE_SEAT_FAILED':
      return Object.assign({}, state, {
        isOpenedBuyInDialog: false,
        selectingSeatNo: null,
      });
    case 'ACTION_CABLE_CONNECTED':
      return Object.assign({}, state, { reconnectingActionCable: false });
    case 'ACTION_CABLE_DISCONNECTED':
      return Object.assign({}, state, { reconnectingActionCable: true });
    default:
      return state;
  }
};

export default GameTableReducer;
