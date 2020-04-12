import TablesReducer from './Tables/reducer.js';

const scenesReducer = (state = {}, action) => {
  return {
    Tables: TablesReducer(state.Tables, action),
  };
};

export default scenesReducer;
