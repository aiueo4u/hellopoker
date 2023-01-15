import { useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Peer from 'skyway-js';

import { buildPeerId } from 'helpers/webrtc';
import usePlayerSessionState from 'hooks/usePlayerSessionState';

const useSkyWay = () => {
  const dispatch = useDispatch();
  const videoState = useSelector(state => state.webRTC);
  const { playerId } = usePlayerSessionState();
  const sfuRoomRef = useRef();
  sfuRoomRef.current = videoState.sfuRoom;

  // SkyWay接続
  useEffect(() => {
    // TODO: key
    const peer = new Peer(buildPeerId(playerId), { key: '4e7556f9-8a3a-4fa1-a928-6905c1c7c2e1', debug: 3 });
    peer.on('open', () => {
      dispatch({ type: 'ON_SUCCESS_OPEN_PEER_CONNECTION', payload: { peer } });
    });

    return () => {
      if (sfuRoomRef.current) {
        sfuRoomRef.current.close();
        dispatch({ type: 'LEAVE_ROOM' });
      }

      peer.disconnect();
      // peer.destroy();
      dispatch({ type: 'CLOSE_PEER_CONNECTION' });
    };
  }, []);
};

export default useSkyWay;
