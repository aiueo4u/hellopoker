import gameTableReducer from 'services/reducers/gameTable';
import playersReducer from 'services/reducers/players';
import data from './data/reducer.js';

const rootReducer = (state = {}, action) => {
  return {
    data: data(state.data, action),
    gameTable: gameTableReducer(state.gameTable, action),
    players: playersReducer(state.players, action),
  };
};

export default rootReducer;
