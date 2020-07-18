import { useSelector } from 'react-redux';

const usePlayerHand = () => {
  const { isRoomViewer, cardsByPlayerId } = useSelector(state => state.roomViewer);
  return { isRoomViewer, cardsByPlayerId };
};

export default usePlayerHand;
