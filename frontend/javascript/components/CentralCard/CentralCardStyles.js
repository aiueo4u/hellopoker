import { makeStyles } from '@material-ui/styles';

const styles = theme => ({
  blindInformation: {
    fontSize: theme.typography.body4.fontSize,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
  container: {
    position: 'absolute',
    height: '300px',
    width: '100%',
    maxWidth: '300px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // border: `1px solid red`, // TODO
  },
  information: {
    position: 'absolute',
    left: '50%',
    width: '100%',
    transform: 'translate(-50%, 0%)',
    color: theme.palette.common.white,
    // border: '1px solid red',
    [theme.breakpoints.up('sm')]: {
      top: 'calc(50% + 60px)',
    },
    [theme.breakpoints.only('xs')]: {
      top: 'calc(50% + 35px)',
      fontSize: theme.typography.caption.fontSize,
    },
  },
  inner: {
    // border: `1px solid blue`, // TODO
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translate(-50%, 0)',
    height: '100%',
    width: '100%',
  },
  message: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '2px',
    padding: theme.spacing(1),
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
  },
  pot: {
    position: 'absolute',
    left: '50%',
    display: 'inline-block',
    color: theme.palette.common.white,
    transform: 'translate(-50%, -100%)',
    [theme.breakpoints.up('sm')]: {
      top: 'calc(50% - 60px)',
    },
    [theme.breakpoints.only('xs')]: {
      top: 'calc(50% - 35px)',
    },
    // border: '1px solid yellow',
  },
});

export default makeStyles(styles);
