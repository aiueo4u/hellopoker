import data from './data/reducer.js';
import scenesReducer from './scenes/reducer.js';

const rootReducer = (state = {}, action) => {
  return {
    data: data(state.data, action),
    scenes: scenesReducer(state.scenes, action),
  };
};

export default rootReducer;
