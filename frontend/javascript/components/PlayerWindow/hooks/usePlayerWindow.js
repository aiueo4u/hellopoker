import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import useSfuRoom from 'hooks/useSfuRoom';

const usePlayerWindow = player => {
  const dispatch = useDispatch();
  const { streamByPlayerId } = useSelector(state => state.webRTC);
  const { playerId } = useSelector(state => state.data.playerSession);
  const [isActiveStream, setIsActiveStream] = useState(false);
  const { broadcastToSfuRoom } = useSfuRoom();
  const stream = streamByPlayerId[player.id];

  const enableAudio = () => {
    const action = { type: 'ENABLE_MIC_AUDIO', payload: { playerId } };
    dispatch(action);
    broadcastToSfuRoom(action);
  };

  const disableAudio = () => {
    const action = { type: 'DISABLE_MIC_AUDIO', payload: { playerId } };
    dispatch(action);
    broadcastToSfuRoom(action);
  };

  const enableVideo = () => {
    const action = { type: 'ENABLE_VIDEO', payload: { playerId } };
    dispatch(action);
    broadcastToSfuRoom(action);
  };

  const disableVideo = () => {
    const action = { type: 'DISABLE_VIDEO', payload: { playerId } };
    dispatch(action);
    broadcastToSfuRoom(action);
  };

  useEffect(() => {
    const nextActiveStream = stream && stream.active;
    setIsActiveStream(nextActiveStream);
  }, [stream && stream.active]);

  useEffect(() => {
    const element = document.getElementById(`video-player-${player.id}`);

    if (isActiveStream && element) {
      // ローカルにカメラの映像を表示
      element.autoplay = 'autoplay';

      // 自分の音声はmute
      if (playerId === player.id) {
        element.muted = true;
      }

      element.srcObject = streamByPlayerId[player.id];
    }
  }, [isActiveStream]);

  return { enableAudio, disableAudio, enableVideo, disableVideo, isActiveStream };
};

export default usePlayerWindow;
