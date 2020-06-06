import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
//import BackgroundImage from 'assets/climpek.png';

const styles = theme => ({
  action: {
    position: 'relative',
    height: '80px',
  },
  background: {
    //backgroundImage: `url(${BackgroundImage})`,
    backgroundColor: green[200],
  },
  container: {
    position: 'relative',
    height: 'calc(var(--vh, 1vh) * 100)',
    //backgroundColor: theme.palette.common.black,
    maxWidth: '1280px',
    minWidth: '800px',
    minHeight: '600px',
    margin: 'auto',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  table: {
    position: 'relative',
    height: 'calc(100% - 80px)',
    //border: `1px solid red`,
  },
});

export default makeStyles(styles);
