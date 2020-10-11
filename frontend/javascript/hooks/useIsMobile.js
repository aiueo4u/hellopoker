import { useTheme, useMediaQuery } from '@material-ui/core';

const useIsMobile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));

  return { isMobile };
};

export default useIsMobile;
