import { useDispatch, useSelector } from 'react-redux';

const usePlayerAvatarWindow = () => {
  const videoState = useSelector(state => state.data.video);
  const dispatch = useDispatch();
  const { playerId } = useSelector(state => state.data.playerSession);

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
    const constraints = {
      audio: true,
      video: {
        width: { max: 320 },
        height: { max: 240 },
        frameRate: { max: 10 },
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        const isAudioEnabled = stream.getAudioTracks().some(track => track.enabled);
        const isVideoEnabled = stream.getVideoTracks().some(track => track.enabled);
        const payload = { stream, playerId, isAudioEnabled, isVideoEnabled };
        dispatch({ type: 'ON_SUCCESS_GET_MEDIA_STREAM', payload });

        if (videoState.sfuRoom) {
          videoState.sfuRoom.close();
          dispatch({ type: 'LEAVE_SFU_ROOM' });
        }

        const sfuRoom = videoState.peer.joinRoom('test-room', { mode: 'sfu', stream });
        sfuRoom.on('stream', stream => {
          const isAudioEnabled = stream.getAudioTracks().some(track => track.enabled);
          const isVideoEnabled = stream.getVideoTracks().some(track => track.enabled);
          const payload = { stream, playerId: stream.peerId, isAudioEnabled, isVideoEnabled };
          dispatch({ type: 'ON_SUCCESS_GET_MEDIA_STREAM', payload });
        });

        dispatch({ type: 'ON_SUCCESS_JOIN_SFU_ROOM', payload: { sfuRoom, playerId } });
      })
      .catch(error => console.log('Error!: ', error)) // eslint-disable-line
  };

  return { startAudio, startVideo };
};

export default usePlayerAvatarWindow;
