import { blue, red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const primary = {
  main: blue[500],
  dark: blue[900],
  sub: blue[300],
  light: blue[100],
};

const theme = createMuiTheme({
  icon: {
    size: {
      small: 16,
      medium: 24,
      large: 40,
    },
  },
  palette: {
    primary,
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
    body2: {
      fontSize: 14,
    },
    body3: {
      fontSize: 13,
    },
    body4: {
      fontSize: 12,
    },
    body5: {
      fontSize: 11,
    },
    body6: {
      fontSize: 10,
    },
    fontWeight: {
      bold: 500,
      regular: 400,
      light: 300,
    },
    fontFamily:
      "'Rubik', 'Rubik', 'Arial', 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ Pro W3', 'Roboto', 'メイリオ', 'Meiryo', 'ＭＳ Ｐゴシック', 'sa    ns-serif'",
  },
});

export default theme;
