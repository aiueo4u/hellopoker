import { makeStyles } from '@material-ui/core/styles';
import BackgroundImage from 'assets/climpek.png';

const styles = theme => ({
  background: {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundColor: theme.palette.grey[900],
  },
  container: {
    position: 'relative',
    height: 'calc(var(--vh, 1vh) * 100)',
    backgroundColor: theme.palette.common.black,
    maxWidth: '640px',
    margin: 'auto',
  },
});

export default makeStyles(styles);
