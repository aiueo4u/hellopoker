import { gameTableReducer, GameTableState, initialState as initialGameTableState } from 'services/reducers/gameTable';
import { playersReducer } from 'services/reducers/players';
import { roomViewerReducer } from 'services/reducers/roomViewer';
import tableMessageReducer from 'ducks/tableMessage';
import webRTCReducer from 'ducks/webRTC';
import { dataReducer } from 'data/reducer';

export type RootState = {
  data: any;
  gameTable: GameTableState;
  players: any[];
  roomViewer: any;
  tableMessage: any;
  webRTC: any;
};

const initialState = {
  data: null,
  gameTable: initialGameTableState,
  players: [],
  roomViewer: null,
  tableMessage: null,
  webRTC: null,
};

export const rootReducer = (state: RootState = initialState, action: any) => {
  return {
    data: dataReducer(state.data, action),
    gameTable: gameTableReducer(state.gameTable, action),
    players: playersReducer(state.players, action),
    roomViewer: roomViewerReducer(state.roomViewer, action),
    tableMessage: tableMessageReducer(state.tableMessage, action),
    webRTC: webRTCReducer(state.webRTC, action),
  };
};
