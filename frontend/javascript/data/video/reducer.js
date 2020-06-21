const initialState = {
  isAudioEnabled: false,
  isReady: false,
  isConnected: false,
  isVideoEnabled: false,
};

const video = (state = initialState, action) => {
  switch (action.type) {
    case 'ENABLE_MIC_AUDIO':
      return { ...state, isAudioEnabled: true };
    case 'ENABLE_VIDEO':
      return { ...state, isVideoEnabled: true };
    case 'DISABLE_MIC_AUDIO':
      return { ...state, isAudioEnabled: false };
    case 'DISABLE_VIDEO':
      return { ...state, isVideoEnabled: false };
    case 'INITIALIZE_WEBRTC_SUCCESS':
      return {
        ...state,
        isReady: true,
        isConnected: true,
        isAudioEnabled: action.isAudioEnabled,
        isVideoEnabled: action.isVideoEnabled,
      };
    default:
      return state;
  }
};

export default video;
