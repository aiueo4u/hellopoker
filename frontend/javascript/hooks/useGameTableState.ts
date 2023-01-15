import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

import { GameHandState } from 'services/reducers/gameTable';

const gameStartable = (gameHandState: GameHandState | undefined): boolean =>
  !gameHandState || ['init', 'finished'].includes(gameHandState);

const useGameTableState = () => {
  const gameTable = useSelector((state: RootState) => state.gameTable);

  const inGame = !gameStartable(gameTable.gameHandState);

  return { ...gameTable, inGame };
};

export default useGameTableState;
