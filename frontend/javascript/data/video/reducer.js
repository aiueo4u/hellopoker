const initialState = {
  isReady: false,
  isConnected: false,
};

const video = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE_WEBRTC_SUCCESS':
      return { ...state, isReady: true, isConnected: true };
    default:
      return state;
  }
};

export default video;
