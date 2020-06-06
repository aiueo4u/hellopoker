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
    width: '150px',
    height: '80px',
    borderRadius: '40px',
    border: `1px solid green`,
  },
  tableContainer: {
    position: 'relative',
    width: '300px',
    height: '200px',
    border: `1px solid blue`,
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
    fontSize: theme.typography.body3.fontSize,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

export default makeStyles(styles);
