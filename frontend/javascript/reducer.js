import gameTableReducer from 'services/reducers/gameTable';
import playersReducer from 'services/reducers/players';
import roomViewerReducer from 'services/reducers/roomViewer';
import tableMessageReducer from 'ducks/tableMessage';
import webRTCReducer from 'ducks/webRTC';
import data from './data/reducer.js';

const rootReducer = (state = {}, action) => {
  return {
    data: data(state.data, action),
    gameTable: gameTableReducer(state.gameTable, action),
    players: playersReducer(state.players, action),
    roomViewer: roomViewerReducer(state.roomViewer, action),
    tableMessage: tableMessageReducer(state.tableMessage, action),
    webRTC: webRTCReducer(state.webRTC, action),
  };
};

export default rootReducer;
