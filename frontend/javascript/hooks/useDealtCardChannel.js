import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ActionCable from 'actioncable';
import { camelizeKeys } from 'humps';
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
          const camelizedData = camelizeKeys(data);
          dispatch(dealtCardsReceived(camelizedData));
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
