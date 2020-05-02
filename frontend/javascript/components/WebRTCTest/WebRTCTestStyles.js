import { makeStyles } from '@material-ui/styles';

const styles = theme => ({
  container: {
    width: '80px',
    height: '60px',
    margin: 'auto',
    position: 'relative',
    boxShadow: theme.shadows[4],
  },
  video: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  videoContainer: {
    backgroundColor: theme.palette.grey['100'],
    border: `1px solid ${theme.palette.grey['500']}`,
    borderRadius: '4px',
    width: '100%',
    height: '100%',
    maskImage: 'radial-gradient(circle, white 100%, black 100%)',
  },
});

export default makeStyles(styles);
