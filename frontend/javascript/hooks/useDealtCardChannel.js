import { useEffect } from 'react';

import ActionCable from 'actioncable';
import { dealtCardsReceived } from 'data/actions';
import { camelizeKeys } from 'humps';
import { useDispatch } from 'react-redux';

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
          // console.debug('DealtCardChannel connected');
        },
        disconnected() {
          // console.debug('DealtCardChannel disconnected');
        },
        received(data) {
          const camelizedData = camelizeKeys(data);
          dispatch(dealtCardsReceived(camelizedData));
        },
        rejected(_) {
          // console.debug('DealtCardChannel rejected', data);
        },
      }
    );

    return () => {
      channel.unsubscribe();
    };
  }, []);
};

export default useDealtCardChannel;
