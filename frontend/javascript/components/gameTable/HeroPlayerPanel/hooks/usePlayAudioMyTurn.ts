import { useEffect } from 'react';

import { useSelector } from 'react-redux';

type Props = { isTurn: boolean };

export const usePlayAudioMyTurn = ({ isTurn }: Props) => {
  const audio = useSelector((state: any) => state.data.audio);

  useEffect(() => {
    if (!isTurn) return;
    if (!audio.isReady) return;
    if (audio.isMuted) return;
    audio.audioMyTurn.play();
  }, [isTurn]);
};
