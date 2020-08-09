import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { camelizeKeys } from 'humps';
import ActionCable from 'actioncable';
import { fetchTableMessages } from 'api';

const useTableMessageChannel = (tableId, scrollListId) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);

  const scrollToBottom = () => {
    const element = document.getElementById(scrollListId);
    if (!element) return;
    if (!element.scrollTo) return;
    element.scrollTo(0, element.scrollHeight);
  };

  const fetchMessages = async () => {
    const data = await fetchTableMessages(tableId).then(response => camelizeKeys(response.data));
    setMessages(messages => [...messages, ...data.tableMessages]);
    scrollToBottom();
  };

  useEffect(() => {
    const cable = ActionCable.createConsumer('/cable'); // TODO

    const channel = cable.subscriptions.create(
      { channel: 'TableMessageChannel', tableId },
      {
        connected() {
          fetchMessages();
        },
        received(data) {
          const message = camelizeKeys(data);
          setMessages(messages => [...messages, message]);
          dispatch({ type: 'RECEIVE_TABLE_MESSAGE', payload: { message } });
          scrollToBottom();
        },
      }
    );

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return { messages };
};

export default useTableMessageChannel;
