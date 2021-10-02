import { gameTableReducer } from 'services/reducers/gameTable';
import { playersReducer } from 'services/reducers/players';
import { roomViewerReducer } from 'services/reducers/roomViewer';
import tableMessageReducer from 'ducks/tableMessage';
import webRTCReducer from 'ducks/webRTC';
import { dataReducer } from 'data/reducer';

export const rootReducer = (state: any = {}, action: any) => {
  return {
    data: dataReducer(state.data, action),
    gameTable: gameTableReducer(state.gameTable, action),
    players: playersReducer(state.players, action),
    roomViewer: roomViewerReducer(state.roomViewer, action),
    tableMessage: tableMessageReducer(state.tableMessage, action),
    webRTC: webRTCReducer(state.webRTC, action),
  };
};
