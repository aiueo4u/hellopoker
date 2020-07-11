import { useDispatch } from 'react-redux';

const usePlayerWindow = () => {
  const dispatch = useDispatch();

  const enableAudio = () => dispatch({ type: 'ENABLE_MIC_AUDIO' });
  const disableAudio = () => dispatch({ type: 'DISABLE_MIC_AUDIO' });
  const enableVideo = () => dispatch({ type: 'ENABLE_VIDEO' });
  const disableVideo = () => dispatch({ type: 'DISABLE_VIDEO' });

  return { enableAudio, disableAudio, enableVideo, disableVideo };
};

export default usePlayerWindow;
