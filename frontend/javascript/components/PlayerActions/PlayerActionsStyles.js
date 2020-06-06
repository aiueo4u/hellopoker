import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    //position: 'absolute',
    //top: '50%',
    //transform: 'translate(-50%, -50%)',
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
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    //border: `1px solid red`,
  },
  /*
  leftButton: {
    [theme.breakpoints.only('xs')]: {
      left: 'calc(50% - 112px)',
    },
    [theme.breakpoints.up('sm')]: {
      left: 'calc(50% - 135px)',
    },
  },
  rightButton: {
    [theme.breakpoints.only('xs')]: {
      left: 'calc(50% + 112px)',
    },
    [theme.breakpoints.up('sm')]: {
      left: 'calc(50% + 135px)',
    },
  },
  */
});

export default makeStyles(styles);
