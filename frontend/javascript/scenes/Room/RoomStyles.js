import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    height: 'calc(var(--vh, 1vh) * 100)',
    backgroundColor: theme.palette.common.black,
    maxWidth: '640px',
    margin: 'auto',
  },
  control: {
    height: '80px',
    width: '100%',
  },
  gameTable: {
    height: 'calc(100% - 80px)',
    width: '100%',
  },
});

export default makeStyles(styles);
