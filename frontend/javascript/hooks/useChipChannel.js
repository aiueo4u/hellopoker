import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ActionCable from 'actioncable';
import { camelizeKeys } from 'humps';
import { playerActionReceived } from 'data/actions';

const useChipChannel = tableId => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cable = ActionCable.createConsumer('/cable'); // TODO

    const channel = cable.subscriptions.create(
      { channel: 'ChipChannel', tableId },
      {
        connected() {
          dispatch({ type: 'ACTION_CABLE_CONNECTED' });
        },
        disconnected() {
          dispatch({ type: 'ACTION_CABLE_DISCONNECTED' });
        },
        received(data) {
          const camelizedData = camelizeKeys(data);
          if (camelizedData.type === 'player_action') {
            dispatch(playerActionReceived(camelizedData));
          }
        },
      }
    );

    return () => {
      channel.unsubscribe();
    };
  }, []);
};

export default useChipChannel;
