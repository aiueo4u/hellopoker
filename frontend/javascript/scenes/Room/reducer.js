import GameTableReducer from './components/GameTable/reducer.js';
import PlayersReducer from './components/ChipAmountControlContainer/reducer.js';

const initialState = {};

const RoomReducer = (state = initialState, action) => {
  return {
    GameTable: GameTableReducer(state.GameTable, action),
    Players: PlayersReducer(state.Players, action),
  };
};

export default RoomReducer;
