import { useEffect, useState } from 'react';

import { fetchTournaments } from 'api';
import { camelizeKeys } from 'humps';

const useTournamentList = () => {
  const [tournaments, setTournaments] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const load = async () => {
    const response = await fetchTournaments();
    const { tournaments } = camelizeKeys(response.data);
    setTournaments(tournaments);
    setIsReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  return { tournaments, isReady };
};

export default useTournamentList;
