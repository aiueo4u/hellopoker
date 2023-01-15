import { useEffect, useState } from 'react';

import { fetchTables } from 'api';
import { camelizeKeys } from 'humps';

export const useTableList = () => {
  const [tables, setTables] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const load = async () => {
    const response = await fetchTables();
    const { tables }: any = camelizeKeys(response.data);
    setTables(tables);
    setIsReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  return [tables, isReady];
};
