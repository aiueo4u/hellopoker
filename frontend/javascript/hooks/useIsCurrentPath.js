import { useLocation } from 'react-router-dom';

const useIsCurrentPath = to => {
  const location = useLocation();
  if (to === '/') {
    return location.pathname === to;
  } else {
    const regexp = new RegExp('^' + to);
    return !!location.pathname.match(regexp);
  }
};

export default useIsCurrentPath;
