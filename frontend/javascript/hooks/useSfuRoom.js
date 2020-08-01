import { useDispatch, useSelector } from 'react-redux';

const useSfuRoom = () => {
  const dispatch = useDispatch();
  const { peer, sfuRoom } = useSelector(state => state.webRTC);

  const joinRoom = (roomName, stream = null) => {
    // ストリーム付きで入り直すために一度退出
    if (sfuRoom) {
      sfuRoom.close();
      dispatch({ type: 'LEAVE_SFU_ROOM' });
    }

    // TODO: test-room
    const options = { mode: 'sfu' };
    if (stream) options.stream = stream;
    const joinedSfuRoom = peer.joinRoom(roomName, options);

    joinedSfuRoom.on('data', ({ data }) => {
      if (data.type === 'redux') dispatch(data.payload);
    });

    // リモートのストリーム接続時のハンドラ
    joinedSfuRoom.on('stream', remoteStream => {
      const isAudioEnabled = remoteStream.getAudioTracks().some(track => track.enabled);
      const isVideoEnabled = remoteStream.getVideoTracks().some(track => track.enabled);
      const remotePlayerId = remoteStream.peerId;
      const payload = { stream: remoteStream, playerId: remotePlayerId, isAudioEnabled, isVideoEnabled };
      dispatch({ type: 'ON_SUCCESS_GET_MEDIA_STREAM', payload });
    });

    dispatch({ type: 'ON_SUCCESS_JOIN_SFU_ROOM', payload: { sfuRoom: joinedSfuRoom } });
  };

  const broadcastToSfuRoom = action => {
    sfuRoom.send({ type: 'redux', payload: action });
  };

  return { broadcastToSfuRoom, joinRoom };
};

export default useSfuRoom;
