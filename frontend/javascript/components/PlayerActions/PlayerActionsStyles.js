import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    textTransform: 'none',
    height: '64px',
    width: '64px',
    touchAction: 'manipulation',
    borderRadius: '32px',
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // border: `1px solid red`,
  },
  leftButton: {
    left: 'calc(50% - 160px)',
  },
  rightButton: {
    left: 'calc(50% + 160px)',
  },
  leftContainer: {
    position: 'absolute',
    top: '15%',
    left: 'calc(50% - 130px)',
    transform: 'translate(-100%, 0%)',
  },
  rightContainer: {
    position: 'absolute',
    top: '15%',
    left: 'calc(50% + 130px)',
    transform: 'translate(0%, 0%)',
    display: 'flex',
  },
  popper: {
    maxWidth: '500px',
  },
});

export default makeStyles(styles);
