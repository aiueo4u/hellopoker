import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const usePlayAudioMyTurn = isTurn => {
  return;
  const audio = useSelector(state => state.data.audio);

  useEffect(() => {
    if(!isTurn) return;
    if (!audio.isReady) return;
    if (audio.isMuted) return;
    audio.audioMyTurn.play();
  }, [isTurn]);
};

export default usePlayAudioMyTurn;
