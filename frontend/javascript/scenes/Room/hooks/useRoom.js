import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Peer from 'skyway-js';

import useDialogState from 'hooks/useDialogState';
import usePlayerSessionState from 'hooks/usePlayerSessionState';

const useRoom = () => {
  const dispatch = useDispatch();
  const [isOpenWelcomeDialog, openWelcomeDialog, closeWelcomeDialog] = useDialogState(false);
  const { playerId } = usePlayerSessionState();
  const { peer } = useSelector(state => state.data.video);

  useEffect(() => {
    openWelcomeDialog();
  }, []);

  // SkyWay接続
  useEffect(() => {
    // TODO: key
    const peer = new Peer(`${playerId}`, { key: '4e7556f9-8a3a-4fa1-a928-6905c1c7c2e1', debug: 3 });
    peer.on('open', () => {
      dispatch({ type: 'ON_SUCCESS_OPEN_PEER_CONNECTION', payload: { peer } });
    });

    return () => {
      peer.disconnect();
      //peer.destroy();
      dispatch({ type: 'CLOSE_PEER_CONNECTION' });
    };
  }, []);

  const joinRoomAsViewer = () => {
    const sfuRoom = peer.joinRoom('test-room', { mode: 'sfu' });
    sfuRoom.on('stream', stream => {
      const isAudioEnabled = stream.getAudioTracks().some(track => track.enabled);
      const isVideoEnabled = stream.getVideoTracks().some(track => track.enabled);
      const payload = { stream, playerId: stream.peerId, isAudioEnabled, isVideoEnabled };
      dispatch({ type: 'ON_SUCCESS_GET_MEDIA_STREAM', payload });
    });

    const payload = { sfuRoom };
    dispatch({ type: 'ON_SUCCESS_JOIN_SFU_ROOM', payload });
  };

  // 観戦者としてルーム入室
  const enterRoomAsViewer = () => {
    joinRoomAsViewer();
    closeWelcomeDialog();
  };

  const enterRoomAsPlayer = () => {
    joinRoomAsViewer();
    closeWelcomeDialog();
  };

  /*
  const handleEnableVideo = () => {
    localStream.getVideoTracks().forEach(track => (track.enabled = true));
  };
  */

  return {
    isOpenWelcomeDialog,
    enterRoomAsViewer,
    enterRoomAsPlayer,
  };
};

export default useRoom;
