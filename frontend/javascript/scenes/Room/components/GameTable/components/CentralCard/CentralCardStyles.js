import { makeStyles } from '@material-ui/styles';

const styles = theme => ({
  board: {
    position: 'absolute',
    top: '120px',
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
  buttonContainer: {
    position: 'absolute',
    top: '200px',
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
  container: {
    position: 'absolute',
    height: '300px',
    width: '50%',
    maxWidth: '300px',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    //border: `1px solid red`, // TODO
  },
  inner: {
    //border: `1px solid blue`, // TODO
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
    top: '60px',
    left: '50%',
    transform: 'translate(-50%, 0)',
    display: 'inline-block',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: theme.palette.common.white,
    padding: theme.spacing(1),
    margin: '16px auto',
    borderRadius: '4px',
  },
});

export default makeStyles(styles);
