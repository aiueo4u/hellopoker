import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';

const styles = theme => ({
  link: {
    textDecoration: 'none',
  },
  table: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '40px',
    border: `1px solid ${green[200]}`,
    backgroundColor: green[100],
    boxShadow: theme.shadows[4],
    cursor: 'pointer',
    '&:hover': {
      boxShadow: theme.shadows[8],
      backgroundColor: green[200],
    },
    [theme.breakpoints.up('sm')]: {
      width: '150px',
      height: '80px',
    },
    [theme.breakpoints.only('xs')]: {
      width: '80px',
      height: '120px',
    },
  },
  tableContainer: {
    position: 'relative',
    width: '300px',
    height: '200px',
    background: theme.palette.grey[100],
    borderRadius: '8px',
    [theme.breakpoints.only('xs')]: {
      width: '140px',
    },
  },
  tableBlind: {
    color: theme.palette.grey[700],
    fontSize: theme.typography.body5.fontSize,
  },
  tableContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    textAlign: 'center',
  },
  tableName: {
    color: theme.palette.grey[800],
    fontSize: theme.typography.body3.fontSize,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

export default makeStyles(styles);
