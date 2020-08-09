import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useDialogState from 'hooks/useDialogState';
import useSfuRoom from 'hooks/useSfuRoom';
import useSkyWay from 'hooks/useSkyWay';
import { startRoomViewing } from 'data/actions';
import { buildRoomName } from 'helpers/webrtc';

const useRoom = tableId => {
  const dispatch = useDispatch();
  const [isOpenWelcomeDialog, openWelcomeDialog, closeWelcomeDialog] = useDialogState(false);
  const { joinRoom } = useSfuRoom();

  useSkyWay();

  const roomName = buildRoomName(tableId);

  useEffect(() => {
    openWelcomeDialog();
  }, []);

  // 観戦者としてルーム入室
  const enterRoomAsViewer = () => {
    dispatch(startRoomViewing());
    joinRoom(roomName);
    closeWelcomeDialog();
  };

  // プレイヤーとしてルーム入室
  const enterRoomAsPlayer = () => {
    joinRoom(roomName);
    closeWelcomeDialog();
  };

  return {
    isOpenWelcomeDialog,
    enterRoomAsViewer,
    enterRoomAsPlayer,
  };
};

export default useRoom;
