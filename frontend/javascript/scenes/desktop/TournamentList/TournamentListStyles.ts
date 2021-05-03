import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme: any) => ({
  background: {
    backgroundColor: green[50],
    width: '100%',
    height: 'calc(var(--vh, 1vh) * 100)',
    padding: theme.spacing(8, 2, 2),
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
    textAlign: 'right',
    margin: theme.spacing(2, 0),
  },
}));
