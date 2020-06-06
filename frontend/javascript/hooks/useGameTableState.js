import { useSelector } from 'react-redux';

const gameStartable = gameHandState => {
  return !gameHandState || gameHandState === 'finished' || gameHandState === 'init';
};

const useGameTableState = () => {
  const gameTable = useSelector(state => state.gameTable);

  const inGame = !gameStartable(gameTable.gameHandState);

  return { ...gameTable, inGame };
};

export default useGameTableState;
