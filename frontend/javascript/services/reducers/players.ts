type PlayerState = {
  actionType: string | undefined;
  betSize: number;
  id: number | undefined;
  cards: readonly any[];
  handShow: boolean;
  state: any;
};

type PlayersAction = {
  type:
    | 'PLAYER_ACTION_RECEIVED'
    | 'SHOW_ACTIVE_PLAYER_CARDS'
    | 'OTHER_PLAYER_ACTION'
    | 'RESET_BET_SIZE'
    | 'SET_BET_SIZE'
    | 'INCREMENT_BET_SIZE'
    | 'DECREMENT_BET_SIZE'
    | 'BET_ACTION'
    | 'CALL_ACTION'
    | 'FOLD_ACTION'
    | 'CHECK_ACTION';
  actionType: string;
  amount: number;
  playerId: number;
  players: PlayerState[];
  playerStack: number;
};

const initialState: PlayerState = {
  actionType: undefined,
  betSize: 0,
  id: undefined,
  cards: [],
  handShow: false,
  state: undefined,
} as const;

const playerReducer = (state: PlayerState = initialState, action: PlayersAction): PlayerState => {
  const player = state;

  if (player.id !== action.playerId) return player;

  let betSize = 0;

  switch (action.type) {
    case 'OTHER_PLAYER_ACTION':
      return { ...player, actionType: action.actionType };
    case 'RESET_BET_SIZE':
      return { ...player, betSize: 0 };
    case 'SET_BET_SIZE':
      betSize = action.amount;
      if (action.playerStack < betSize) {
        betSize = action.playerStack;
      }
      return { ...player, betSize };
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
    case 'BET_ACTION':
    case 'CALL_ACTION':
    case 'FOLD_ACTION':
    case 'CHECK_ACTION':
      return {
        ...player,
      };
    default:
      return player;
  }
};

export type PlayersState = PlayerState[];

const initialPlayersState: PlayerState[] = [];

export const playersReducer = (state: PlayersState = initialPlayersState, action: PlayersAction): PlayersState => {
  switch (action.type) {
    case 'PLAYER_ACTION_RECEIVED':
      return action.players.map(player => ({ ...player, betSize: 0, actionType: undefined }));
    case 'SHOW_ACTIVE_PLAYER_CARDS':
      return state.map(player => {
        const actionPlayer = action.players.find(ap => ap.id === player.id);
        if (!actionPlayer) {
          return player;
        }
        return {
          ...player,
          cards: actionPlayer.cards,
          handShow: actionPlayer.handShow,
          state: actionPlayer.state,
        };
      });
    default:
      return state.map(player => playerReducer(player, action));
  }
};
