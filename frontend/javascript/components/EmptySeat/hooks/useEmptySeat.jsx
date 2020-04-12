import { useSelector } from 'react-redux';

const useEmptySeat = () => {
  const { playerSession } = useSelector(state => state.data);
  const { Room } = useSelector(state => state.scenes.Tables);
  const players = Room.Players;

  const isSeated = players.some(player => player.id === playerSession.playerId);
  return [isSeated];
};

export default useEmptySeat;
