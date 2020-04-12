import { useSelector } from 'react-redux';

const gameStartable = gameHandState => {
  return !gameHandState || gameHandState === 'finished' || gameHandState === 'init';
}

const useGameTableState = () => {
  const { GameTable: gameTable } = useSelector(state => state.scenes.Tables.Room);

  const inGame = !gameStartable(gameTable.gameHandState);

  return { ...gameTable, inGame };
};

export default useGameTableState;
