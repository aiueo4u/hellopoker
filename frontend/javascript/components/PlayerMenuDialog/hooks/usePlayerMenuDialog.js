import * as apis from 'api';

const usePlayerMenuDialog = tableId => {
  const retryNpcPlayerAction = () => {
    const body = new FormData();
    body.append('table_id', tableId);
    apis.retryNpcPlayerAction(body);
  };

  return { retryNpcPlayerAction };
};

export default usePlayerMenuDialog;
