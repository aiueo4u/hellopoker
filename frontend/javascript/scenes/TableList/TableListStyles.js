import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

const styles = theme => ({
  button: {
    width: '220px',
  },
  container: {
    backgroundColor: green[200],
    width: '100%',
    height: 'calc(var(--vh, 1vh) * 100)',
    padding: theme.spacing(4),
  },
  link: {
    textDecoration: 'none',
  },
  newTableForm: {
    position: 'fixed',
    right: theme.spacing(3),
    bottom: theme.spacing(3),
    //backgroundColor: theme.palette.grey[100],
    //borderRadius: theme.spacing(1 / 2),
    textAlign: 'right',
    margin: theme.spacing(2, 0),
  },
});

export default makeStyles(styles);
