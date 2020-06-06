import { useSelector } from 'react-redux';

const usePlayerSessionState = () => {
  const { playerSession } = useSelector(state => state.data);

  return playerSession;
};

export default usePlayerSessionState;
