import { useSelector } from 'react-redux';
import usePlayersState from 'hooks/usePlayersState';

const useEmptySeat = () => {
  const { playerSession } = useSelector(state => state.data);
  const players = usePlayersState();

  const isSeated = players.some(player => player.id === playerSession.playerId);
  return [isSeated];
};

export default useEmptySeat;
