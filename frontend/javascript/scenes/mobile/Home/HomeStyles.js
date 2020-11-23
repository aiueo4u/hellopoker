import { makeStyles } from '@material-ui/styles';

const styles = theme => ({
  base: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(8),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    textAlign: 'center',
    margin: 'auto',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default makeStyles(styles);
