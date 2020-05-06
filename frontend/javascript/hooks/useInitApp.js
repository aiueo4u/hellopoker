import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const useInitApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectTo = sessionStorage.getItem('redirectTo');
    sessionStorage.removeItem('redirectTo');
    if (redirectTo) {
      window.location = redirectTo;
    } else {
      dispatch({ type: 'FETCH_PLAYER' });
    }
  }, []);
};

export default useInitApp;
