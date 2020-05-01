import playerSession from './playerSession/reducer.js';
import tables from './tables/reducer.js';
import video from './video/reducer';

const data = (state = {}, action) => {
  return {
    playerSession: playerSession(state.playerSession, action),
    video: video(state.video, action),
    tables: tables(state.tables, action),
  };
};

export default data;
