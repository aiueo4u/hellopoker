import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

export const useStyles = makeStyles(() => ({
  background: {
    backgroundColor: green[50],
  },
  chatCard: {
    width: '40%',
  },
  container: {
    position: 'relative',
    height: 'calc(var(--vh, 1vh) * 100)',
    margin: 'auto',
    maxWidth: '1280px',
    minWidth: '1000px',
    minHeight: '600px',
  },
  table: {
    position: 'relative',
    height: '100%',
    width: '100%',
    // border: `1px solid red`,
  },
}));
