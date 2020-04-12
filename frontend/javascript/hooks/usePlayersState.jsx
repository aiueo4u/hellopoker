import { useSelector } from 'react-redux';

const usePlayersState = () => {
  const { Players: players } = useSelector(state => state.scenes.Tables.Room);

  return players;
};

export default usePlayersState;
