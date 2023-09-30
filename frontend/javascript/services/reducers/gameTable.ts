type Action = {
  type:
    | 'SETUP_GAME_START_TIMER'
    | 'GAME_START_COMPLETED'
    | 'ON_CHANGE_BUY_IN_AMOUNT'
    | 'DEALT_CARD_RECEIVED'
    | 'OPEN_BOARD_CARD_BY_ROUND'
    | 'OPEN_PLAYER_MENU_DIALOG'
    | 'CLOSE_PLAYER_MENU_DIALOG'
    | 'OPEN_BUY_IN_DIALOG'
    | 'CLOSE_BUY_IN_DIALOG'
    | 'PLAYER_TAKE_SEAT'
    | 'PLAYER_ACTION_TAKE_SEAT_COMPLETED'
    | 'PLAYER_ACTION_TAKE_SEAT_FAILED'
    | 'ACTION_CABLE_CONNECTED'
    | 'ACTION_CABLE_DISCONNECTED'
    | 'PLAYER_ACTION_RECEIVED';
  amount: string;
  boardCards: any[];
  cards: any[];
  justCreated: boolean;
  playerId: number;
  reachedRounds: any;
  seatNo: number;
  seconds: number;
};

export type GameHandState = 'init' | 'finished' | 'flop' | 'turn' | 'river';

export type GameTableState = {
  boardCards: readonly any[];
  buyInAmount: string;
  buyInPlayerId: number | undefined;
  currentSeatNo: number | null;
  dealtCards: readonly any[];
  gameHandCount: number;
  gameHandState: GameHandState | undefined;
  justActioned: boolean;
  justCreated: boolean;
  isOpenedBuyInDialog: boolean;
  isOpenGameStartCountdown: boolean;
  isReady: boolean;
  openingPlayerMenuDialogPlayerId: number | undefined;
  pot: number;
  reachedRounds: any;
  reconnectingActionCable: boolean;
  selectingSeatNo: number | undefined;
  timeToStart: number;
  table: any;
  tournament: any;
};

export const initialState: GameTableState = {
  boardCards: [],
  buyInAmount: '',
  buyInPlayerId: undefined,
  currentSeatNo: null,
  dealtCards: [],
  gameHandCount: 0,
  gameHandState: undefined,
  justActioned: false,
  justCreated: false, // ゲーム開始直後かどうか
  isOpenedBuyInDialog: false,
  isOpenGameStartCountdown: false,
  isReady: false,
  openingPlayerMenuDialogPlayerId: undefined,
  pot: 0,
  reachedRounds: [],
  reconnectingActionCable: false,
  selectingSeatNo: undefined,
  timeToStart: 0,
  table: {},
  tournament: undefined,
} as const;

export const gameTableReducer = (state: GameTableState = initialState, action: Action): GameTableState => {
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
      return { ...state, buyInAmount: action.amount };
    case 'DEALT_CARD_RECEIVED':
      return {
        ...state,
        isOpenGameStartCountdown: false,
        justCreated: action.justCreated,
        dealtCards: {
          ...state.dealtCards,
          [action.playerId]: action.cards,
        },
      };
    case 'OPEN_BOARD_CARD_BY_ROUND':
      return { ...state, reachedRounds: action.reachedRounds, boardCards: action.boardCards };
    case 'PLAYER_ACTION_RECEIVED':
      return { ...state, ...action, isReady: true };
    case 'OPEN_PLAYER_MENU_DIALOG':
      return { ...state, openingPlayerMenuDialogPlayerId: action.playerId };
    case 'CLOSE_PLAYER_MENU_DIALOG':
      return { ...state, openingPlayerMenuDialogPlayerId: undefined };
    case 'OPEN_BUY_IN_DIALOG':
      return { ...state, isOpenedBuyInDialog: true, selectingSeatNo: action.seatNo, buyInPlayerId: action.playerId };
    case 'CLOSE_BUY_IN_DIALOG':
      return { ...state, isOpenedBuyInDialog: false, selectingSeatNo: undefined, buyInAmount: '' };
    case 'PLAYER_TAKE_SEAT':
      return { ...state, buyInAmount: '' };
    case 'PLAYER_ACTION_TAKE_SEAT_COMPLETED':
      return { ...state, isOpenedBuyInDialog: false, selectingSeatNo: undefined };
    case 'PLAYER_ACTION_TAKE_SEAT_FAILED':
      return { ...state, isOpenedBuyInDialog: false, selectingSeatNo: undefined };
    case 'ACTION_CABLE_CONNECTED':
      return { ...state, reconnectingActionCable: false };
    case 'ACTION_CABLE_DISCONNECTED':
      return { ...state, reconnectingActionCable: true };
    default:
      return state;
  }
};
