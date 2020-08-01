import useWebRTC from 'hooks/useWebRTC';

const usePlayerAvatarWindow = () => {
  const { startWebRTC } = useWebRTC();

  const startAudio = () => {
    const options = { isVideoEnabled: false, isAudioEnabled: true };
    startWebRTC(options);
  };

  const startVideo = () => {
    const options = { isVideoEnabled: true, isAudioEnabled: true };
    startWebRTC(options);
  };

  return { startAudio, startVideo };
};

export default usePlayerAvatarWindow;
