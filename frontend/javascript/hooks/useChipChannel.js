import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ActionCable from 'actioncable';
import { playerActionReceived, gameHandActionReceived, gameHandFinishedReceived } from 'data/actions';

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
          if (data.type === 'player_action') {
            dispatch(playerActionReceived(data));
          } else if (data.type === 'game_hand') {
            dispatch(gameHandActionReceived(data.pot, data.players));
          } else if (data.type === 'game_hand_finished') {
            dispatch(gameHandFinishedReceived());
          }
        },
        rejected(_) {
          // console.debug('Chip Channel rejected', data);
        },
      }
    );

    return () => {
      channel.unsubscribe();
    };
  }, []);
};

export default useChipChannel;
