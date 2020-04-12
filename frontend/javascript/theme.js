import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5B9FA4',
    },
    twitter: {
      main: '#1DA1F2',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;
