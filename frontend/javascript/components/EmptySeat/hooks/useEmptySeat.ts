import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

import { usePlayersState } from 'hooks/usePlayersState';

export const useEmptySeat = () => {
  const { playerId } = useSelector((state: RootState) => state.data.playerSession);
  const { isRoomViewer } = useSelector((state: RootState) => state.roomViewer);
  const players = usePlayersState();

  const isSeated = players.some(player => player.id === playerId);

  return { isSeated, isRoomViewer };
};
