import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: red['700'],
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
