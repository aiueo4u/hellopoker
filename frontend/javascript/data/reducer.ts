import { audioReducer, AudioState } from './audio/reducer';
import { playerSession, PlayerSessionState } from './playerSession/reducer';
import { tables, TablesState } from './tables/reducer';

type DataState = {
  audio: AudioState | undefined;
  playerSession: PlayerSessionState | undefined;
  tables: TablesState | undefined;
};

const initialState = {
  audio: undefined,
  playerSession: undefined,
  tables: undefined,
};

export const dataReducer = (state: DataState = initialState, action: any): DataState => {
  return {
    audio: audioReducer(state.audio, action),
    playerSession: playerSession(state.playerSession, action),
    tables: tables(state.tables, action),
  };
};
