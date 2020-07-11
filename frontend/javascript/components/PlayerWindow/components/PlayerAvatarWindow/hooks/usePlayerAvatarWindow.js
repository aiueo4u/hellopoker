import { useDispatch, useSelector } from 'react-redux';

const usePlayerAvatarWindow = () => {
  const videoState = useSelector(state => state.data.video);
  const dispatch = useDispatch();

  const startAudio = () => {
    if (videoState.isConnected) return;

    const onSuccess = () => {
      dispatch({ type: 'INITIALIZE_WEBRTC_SUCCESS', isVideoEnabled: false, isAudioEnabled: true });
      dispatch({ type: 'HANDLE_JOIN_SESSION' });
    };

    const payload = { onSuccess, isVideoEnabled: false, isAudioEnabled: true };
    dispatch({ type: 'INITIALIZE_WEBRTC', payload });
  };

  const startVideo = () => {
    if (videoState.isConnected) return;

    const onSuccess = () => {
      dispatch({ type: 'INITIALIZE_WEBRTC_SUCCESS', isVideoEnabled: true, isAudioEnabled: true });
      dispatch({ type: 'HANDLE_JOIN_SESSION' });
    };

    const payload = { onSuccess, isVideoEnabled: true, isAudioEnabled: true };
    dispatch({ type: 'INITIALIZE_WEBRTC', payload });
  };

  return { startAudio, startVideo };
};

export default usePlayerAvatarWindow;
