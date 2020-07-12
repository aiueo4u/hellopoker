import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const usePlayerWindow = player => {
  const dispatch = useDispatch();
  const { streamByPlayerId } = useSelector(state => state.data.video);
  const { playerId } = useSelector(state => state.data.playerSession);

  // TODO: ON/OFF状況をみんなにも伝える
  const enableAudio = () => {
    const stream = streamByPlayerId[playerId];
    if (!stream) return;
    stream.getAudioTracks().forEach(track => (track.enabled = true));
    dispatch({ type: 'ENABLE_MIC_AUDIO', payload: { playerId } });
  };

  const disableAudio = () => {
    const stream = streamByPlayerId[playerId];
    if (!stream) return;
    stream.getAudioTracks().forEach(track => (track.enabled = false));
    dispatch({ type: 'DISABLE_MIC_AUDIO', payload: { playerId } });
  };

  const enableVideo = () => {
    const stream = streamByPlayerId[playerId];
    if (!stream) return;
    stream.getVideoTracks().forEach(track => (track.enabled = true));
    dispatch({ type: 'ENABLE_VIDEO', payload: { playerId } });
  };

  const disableVideo = () => {
    const stream = streamByPlayerId[playerId];
    if (!stream) return;
    stream.getVideoTracks().forEach(track => (track.enabled = false));
    dispatch({ type: 'DISABLE_VIDEO', payload: { playerId } });
  };

  useEffect(() => {
    if (streamByPlayerId[player.id]) {
      // ローカルにカメラの映像を表示
      const element = document.getElementById(`video-player-${player.id}`);
      element.autoplay = 'autoplay';

      // 自分の音声はmute
      if (playerId === player.id) {
        element.muted = true;
      }

      element.srcObject = streamByPlayerId[player.id];
    }
  }, [streamByPlayerId[player.id]]);

  return { enableAudio, disableAudio, enableVideo, disableVideo };
};

export default usePlayerWindow;
