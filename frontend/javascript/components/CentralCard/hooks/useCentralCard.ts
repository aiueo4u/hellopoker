import { startTournament } from 'api';

import useGameTableState from 'hooks/useGameTableState';

export const useCentralCard = () => {
  const gameTable = useGameTableState();

  const onClickStartTournament = async () => {
    if (!gameTable.tournament) return;
    await startTournament(gameTable.tournament.id);
  };

  return { onClickStartTournament };
};
