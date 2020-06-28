import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { camelizeKeys } from 'humps';

import { fetchTournament } from 'api';

const useTournament = () => {
  const [tables, setTables] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const match = useRouteMatch();
  const tournamentId = match.params.id;

  const load = async () => {
    const response = await fetchTournament(tournamentId);
    const { tournament } = camelizeKeys(response.data);
    setTables(tournament.tables);
    setIsReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  return [tables, isReady];
};

export default useTournament;
