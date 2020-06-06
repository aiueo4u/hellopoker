import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  icon: {
    size: {
      small: 16,
      medium: 24,
      large: 40,
    },
  },
  palette: {
    secondary: {
      main: red['700'],
    },
    twitter: {
      main: '#1DA1F2',
    },
  },
  typography: {
    body: {
      fontSize: 14,
    },
    fontWeight: {
      bold: 500,
      regular: 400,
      light: 300,
    },
  },
});

export default theme;
