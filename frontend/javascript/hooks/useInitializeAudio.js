import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import audioCallPath from 'assets/audio/call.mp3';
import audioMyTurnPath from 'assets/audio/myturn.mp3';

const useInitializeAudio = () => {
  const dispatch = useDispatch();
  const audio = useSelector(state => state.data.audio);

  const initializeAudio = () => {
    if (audio.isReady) return;

    const audioCall = new Audio(audioCallPath);
    audioCall.id = 'audio-call';
    audioCall.preload = 'auto';
    // TODO: canplaythrough listener
    audioCall.load();
    //audioCall.play();

    const audioMyTurn =  new Audio(audioMyTurnPath);
    audioMyTurn.id = 'audio-myturn';
    audioMyTurn.preload = 'auto';
    audioMyTurn.load();
    //audioMyTurn.play();

    const payload = { audioCall, audioMyTurn };
    dispatch({ type: 'INITIALIZED_AUDIO', payload });
  };

  return [initializeAudio];
};

export default useInitializeAudio;
