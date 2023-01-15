import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

import { usePlayersState } from 'hooks/usePlayersState';

export const useEmptySeat = () => {
  const { playerSession } = useSelector((state: RootState) => state.data);
  const { isRoomViewer } = useSelector((state: RootState) => state.roomViewer);
  const players = usePlayersState();

  const isSeated = players.some(player => player.id === playerSession.playerId);

  return { isSeated, isRoomViewer };
};
