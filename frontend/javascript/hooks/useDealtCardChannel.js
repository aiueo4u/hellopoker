import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ActionCable from 'actioncable';
import { dealtCardsReceived } from 'data/actions';

const useDealtCardChannel = tableId => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cable = ActionCable.createConsumer('/cable'); // TODO

    const channel = cable.subscriptions.create(
      {
        channel: 'DealtCardChannel',
        tableId,
      },
      {
        connected() {
          //console.debug('DealtCardChannel connected');
        },
        disconnected() {
          //console.debug('DealtCardChannel disconnected');
        },
        received(data) {
          //console.debug('DealtCardChannel received: ', data);
          dispatch(dealtCardsReceived(data));
        },
        rejected(_) {
          //console.debug('DealtCardChannel rejected', data);
        },
      }
    );

    return () => {
      channel.unsubscribe();
    };
  }, []);
};

export default useDealtCardChannel;
