import { useSelector } from 'react-redux';

export const usePlayerHand = () => {
  const { isRoomViewer, cardsByPlayerId } = useSelector((state: any) => state.roomViewer);
  return { isRoomViewer, cardsByPlayerId };
};
