import { useEffect } from 'react';

const useAdjustWindow = () => {
  useEffect(() => {
    const resize = () => {
      const vh = window.innerHeight * 0.01;
      const vw = window.innerWidth * 0.01;
      window.document.documentElement.style.setProperty('--vh', `${vh}px`);
      window.document.documentElement.style.setProperty('--vw', `${vw}px`);
    };

    window.addEventListener('resize', resize);
    resize();
  }, []);
};

export default useAdjustWindow;
