import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

const styles = theme => ({
  background: {
    backgroundColor: green[50],
    width: '100%',
    height: 'calc(var(--vh, 1vh) * 100)',
    padding: theme.spacing(4),
  },
  button: {
    width: '220px',
  },
  container: {
    background: theme.palette.grey[200],
    border: `2px solid ${theme.palette.grey[300]}`,
    borderRadius: '16px',
    padding: theme.spacing(2),
    boxShadow: theme.shadows[2],
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
