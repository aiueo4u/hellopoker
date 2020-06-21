import { useDispatch, useSelector } from 'react-redux';

const usePlayerWindow = () => {
  const videoState = useSelector(state => state.data.video);
  const dispatch = useDispatch();

  const startVideo = () => {
    if (videoState.isConnected) return;

    const onSuccess = () => {
      dispatch({ type: 'INITIALIZE_WEBRTC_SUCCESS', isVideoEnabled: true, isAudioEnabled: true });
      dispatch({ type: 'HANDLE_JOIN_SESSION' });
    };

    const payload = { onSuccess, isVideoEnabled: true, isAudioEnabled: true };
    dispatch({ type: 'INITIALIZE_WEBRTC', payload });
  };

  const startAudio = () => {
    if (videoState.isConnected) return;

    const onSuccess = () => {
      dispatch({ type: 'INITIALIZE_WEBRTC_SUCCESS', isVideoEnabled: false, isAudioEnabled: true });
      dispatch({ type: 'HANDLE_JOIN_SESSION' });
    };

    const payload = { onSuccess, isVideoEnabled: false, isAudioEnabled: true };
    dispatch({ type: 'INITIALIZE_WEBRTC', payload });
  };

  const enableAudio = () => dispatch({ type: 'ENABLE_MIC_AUDIO' });
  const disableAudio = () => dispatch({ type: 'DISABLE_MIC_AUDIO' });
  const enableVideo = () => dispatch({ type: 'ENABLE_VIDEO' });
  const disableVideo = () => dispatch({ type: 'DISABLE_VIDEO' });

  return { startVideo, startAudio, enableAudio, disableAudio, enableVideo, disableVideo };
};

export default usePlayerWindow;
