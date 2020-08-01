import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Peer from 'skyway-js';

import useDialogState from 'hooks/useDialogState';
import usePlayerSessionState from 'hooks/usePlayerSessionState';
import useSfuRoom from 'hooks/useSfuRoom';
import { startRoomViewing } from 'data/actions';

const useRoom = () => {
  const dispatch = useDispatch();
  const [isOpenWelcomeDialog, openWelcomeDialog, closeWelcomeDialog] = useDialogState(false);
  const { playerId } = usePlayerSessionState();
  const videoState = useSelector(state => state.webRTC);
  const { joinRoom } = useSfuRoom();
  const sfuRoomRef = useRef();
  sfuRoomRef.current = videoState.sfuRoom;

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
      if (sfuRoomRef.current) {
        sfuRoomRef.current.close();
        dispatch({ type: 'LEAVE_ROOM' });
      }

      peer.disconnect();
      //peer.destroy();
      dispatch({ type: 'CLOSE_PEER_CONNECTION' });
    };
  }, []);

  // 観戦者としてルーム入室
  const enterRoomAsViewer = () => {
    dispatch(startRoomViewing());
    joinRoom('test-room');
    closeWelcomeDialog();
  };

  // プレイヤーとしてルーム入室
  const enterRoomAsPlayer = () => {
    joinRoom('test-room');
    closeWelcomeDialog();
  };

  return {
    isOpenWelcomeDialog,
    enterRoomAsViewer,
    enterRoomAsPlayer,
  };
};

export default useRoom;
