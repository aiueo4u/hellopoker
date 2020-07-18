import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionCable from 'actioncable';
import { camelizeKeys } from 'humps';
import { onReceiveRoomViewerChannel } from 'data/actions';

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
          camelizedData.map(row => {
            cardsByPlayerId[row.playerId] = row.cards;
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
