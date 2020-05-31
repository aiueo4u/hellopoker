import { makeStyles } from '@material-ui/core/styles';
import BackgroundImage from 'assets/climpek.png';

const styles = theme => ({
  action: {
    position: 'relative',
    height: '80px',
  },
  background: {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundColor: 'green',
  },
  container: {
    position: 'relative',
    height: 'calc(var(--vh, 1vh) * 100)',
    //backgroundColor: theme.palette.common.black,
    width: '1280px',
    margin: 'auto',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  table: {
    height: 'calc(100% - 80px)',
    //border: `1px solid red`,
  },
});

export default makeStyles(styles);
