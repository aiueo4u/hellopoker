import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const styles = theme => ({
  background: {
    backgroundColor: green[50],
  },
  chatCard: {
    width: '40%',
  },
  container: {
    position: 'relative',
    height: 'calc(var(--vh, 1vh) * 100)',
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
    height: '100%',
    //border: `1px solid red`,
  },
});

export default makeStyles(styles);
