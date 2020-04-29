import { useSelector } from 'react-redux';

const usePlayersState = () => {
  const players = useSelector(state => state.players);

  return players;
};

export default usePlayersState;
