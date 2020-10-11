import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    textTransform: 'none',
    touchAction: 'manipulation',
    width: '100%',
    '&:disabled': {
      backgroundColor: theme.palette.grey['300'],
      color: theme.palette.common.black,
    },
  },
  betButton: {
    textTransform: 'none',
    touchAction: 'manipulation',
  },
  resetButton: {
    color: theme.palette.grey[300],
    textTransform: 'none',
    touchAction: 'manipulation',
  },
  container: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    height: '48px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0px 8px',
    //border: `1px solid red`,
  },
  popper: {
    maxWidth: '400px',
  },
});

export default makeStyles(styles);
