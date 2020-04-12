import playerSession from "./playerSession/reducer.js";
import tables from "./tables/reducer.js";

const data = (state = {}, action) => {
  return {
    playerSession: playerSession(state.playerSession, action),
    tables: tables(state.tables, action)
  };
};

export default data;
