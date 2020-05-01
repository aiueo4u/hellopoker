import { makeStyles } from '@material-ui/styles';

const styles = theme => ({
  container: {
    width: '80px',
    height: '80px',
    backgroundColor: theme.palette.common.white,
    border: `1px solid white`,
    borderRadius: '40px',
    maskImage: 'radial-gradient(circle, white 100%, black 100%)',
  },
  video: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
  },
});

export default makeStyles(styles);
