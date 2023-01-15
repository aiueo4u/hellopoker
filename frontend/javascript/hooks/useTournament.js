import { useEffect, useState } from 'react';

import { entryTournament, fetchTournament } from 'api';
import { camelizeKeys } from 'humps';
import { useHistory, useRouteMatch } from 'react-router-dom';

const useTournament = () => {
  const [tables, setTables] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const match = useRouteMatch();
  const history = useHistory();
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

  const onClickEntry = async () => {
    const response = await entryTournament(tournamentId);
    const { table } = camelizeKeys(response.data);
    history.push(`/tables/${table.id}`);
  };

  return { tables, isReady, onClickEntry };
};

export default useTournament;
