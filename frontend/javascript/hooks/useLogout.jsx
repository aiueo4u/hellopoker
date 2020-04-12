import { logout } from 'api';

const useLogout = () => {
  return async () => {
    sessionStorage.clear();
    await logout();
    window.location.href = '/login';
  };
};

export default useLogout;
