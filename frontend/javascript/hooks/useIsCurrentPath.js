import { useLocation } from 'react-router-dom';

const useIsCurrentPath = to => {
  const location = useLocation();
  if (to === '/') {
    return location.pathname === to;
  }
  const regexp = new RegExp(`^${to}`);
  return !!location.pathname.match(regexp);
};

export default useIsCurrentPath;
