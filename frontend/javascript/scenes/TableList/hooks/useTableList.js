import { useEffect, useState } from 'react';
import { camelizeKeys } from 'humps';

import { fetchTables } from 'api';

const useTableList = () => {
  const [tables, setTables] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const load = async () => {
    const response = await fetchTables();
    const { tables } = camelizeKeys(response.data);
    setTables(tables);
    setIsReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  return [tables, isReady];
};

export default useTableList;
