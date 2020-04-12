import { useSelector } from 'react-redux';

const useRoomState = () => {
  const { Room } = useSelector(state => state.scenes.Tables);
  return Room;
};

export default useRoomState;
