import useWebRTC from 'hooks/useWebRTC';
import { buildRoomName } from 'helpers/webrtc';

const usePlayerAvatarWindow = tableId => {
  const { startWebRTC } = useWebRTC();
  const roomName = buildRoomName(tableId);

  const startAudio = () => {
    const options = { isVideoEnabled: false, isAudioEnabled: true };
    startWebRTC(roomName, options);
  };

  const startVideo = () => {
    const options = { isVideoEnabled: true, isAudioEnabled: true };
    startWebRTC(roomName, options);
  };

  return { startAudio, startVideo };
};

export default usePlayerAvatarWindow;
