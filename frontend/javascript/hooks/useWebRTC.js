import { useDispatch, useSelector } from 'react-redux';
import useSfuRoom from 'hooks/useSfuRoom';

// あとからON/OFF切り替えられるようにマイク・カメラ両方の権限を取得しておく
const defaultConstraints = {
  audio: true,
  video: {
    width: { max: 320 },
    height: { max: 240 },
    frameRate: { max: 10 },
  },
};

const useWebRTC = () => {
  const dispatch = useDispatch();
  const { playerId } = useSelector(state => state.data.playerSession);
  const { joinRoom } = useSfuRoom();

  const startWebRTC = options => {
    // 非対応ブラウザ
    if (!navigator.mediaDevices) {
      console.warn('mediaDevices not found'); // eslint-disable-line
    }

    navigator.mediaDevices
      .getUserMedia(defaultConstraints)
      .then(localStream => {
        const { isAudioEnabled, isVideoEnabled } = options;

        // ローカルのストリームの設定
        if (!isAudioEnabled) localStream.getAudioTracks().forEach(track => (track.enabled = false));
        if (!isVideoEnabled) localStream.getVideoTracks().forEach(track => (track.enabled = false));
        const payload = { stream: localStream, playerId, isAudioEnabled, isVideoEnabled };
        dispatch({ type: 'ON_SUCCESS_GET_MEDIA_STREAM', payload });

        // ルーム入室
        joinRoom('test-room', localStream);
      })
      .catch(error => console.error('Error!: ', error)) // eslint-disable-line
  };

  return { startWebRTC };
};

export default useWebRTC;
