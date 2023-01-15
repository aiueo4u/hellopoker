import { useEffect } from 'react';

import ActionCable from 'actioncable';
import { onReceiveRoomViewerChannel } from 'data/actions';
import { camelizeKeys } from 'humps';
import { useDispatch, useSelector } from 'react-redux';

const useRoomViewerChannel = tableId => {
  const dispatch = useDispatch();
  const { isRoomViewer } = useSelector(state => state.roomViewer);

  useEffect(() => {
    if (!isRoomViewer) return;

    const cable = ActionCable.createConsumer('/cable'); // TODO

    const channel = cable.subscriptions.create(
      { channel: 'RoomViewerChannel', tableId },
      {
        received(data) {
          const camelizedData = camelizeKeys(data);
          const cardsByPlayerId = {};
          Object.keys(camelizedData).map(playerId => {
            cardsByPlayerId[playerId] = camelizedData[playerId].cards;
          });
          const payload = { cardsByPlayerId };
          dispatch(onReceiveRoomViewerChannel(payload));
        },
      }
    );

    return () => {
      channel.unsubscribe();
    };
  }, [isRoomViewer]);
};

export default useRoomViewerChannel;
