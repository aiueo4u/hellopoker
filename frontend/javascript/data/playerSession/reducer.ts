type CurrentPlayer = {
  id: number;
  name: string;
  profileImageUrl: string;
};

export type PlayerSessionState = {
  isReady: boolean;
  isLoggedIn: boolean;
  name: string | undefined;
  playerId: number | undefined;
  profileImageUrl: string | undefined;
  currentPlayer: CurrentPlayer | undefined;
};

type Action = {
  type: 'FETCH_PLAYER_SUCCEEDED' | 'FETCH_PLAYER_FAILED' | 'UPDATE_PLAYER_SUCCEEDED';
  payload: any;
  name: string;
  playerId: number;
  profileImageUrl: string;
};

const initialState: PlayerSessionState = {
  isReady: false,
  isLoggedIn: false,
  name: undefined,
  playerId: undefined,
  profileImageUrl: undefined,
  currentPlayer: undefined,
} as const;

export const playerSession = (state: PlayerSessionState = initialState, action: Action): PlayerSessionState => {
  const { payload } = action;

  switch (action.type) {
    case 'FETCH_PLAYER_SUCCEEDED':
      return {
        ...state,
        isReady: true,
        isLoggedIn: true,
        name: action.name,
        playerId: action.playerId,
        profileImageUrl: action.profileImageUrl,
        currentPlayer: {
          id: action.playerId,
          name: action.name,
          profileImageUrl: action.profileImageUrl,
        },
      };
    case 'FETCH_PLAYER_FAILED':
      return { ...state, isReady: true };
    case 'UPDATE_PLAYER_SUCCEEDED':
      return {
        ...state,
        name: payload.updatedPlayer.name,
        playerId: payload.updatedPlayer.playerId,
        profileImageUrl: payload.updatedPlayer.profileImageUrl,
        currentPlayer: {
          id: payload.updatedPlayer.playerId,
          name: payload.updatedPlayer.name,
          profileImageUrl: payload.updatedPlayer.profileImageUrl,
        },
      };
    default:
      return state;
  }
};
