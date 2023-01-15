import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

export const usePlayersState = () => useSelector((state: RootState) => state.players);
