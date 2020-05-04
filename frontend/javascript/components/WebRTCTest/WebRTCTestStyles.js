import { makeStyles } from '@material-ui/styles';

const styles = theme => ({
  container: ({ player }) => {
    return {
      width: '80px',
      height: '60px',
      margin: 'auto',
      boxShadow: theme.shadows[4],
    };

    const base = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '80px',
      height: '60px',
      margin: 'auto',
      boxShadow: theme.shadows[4],
    };

    switch (player.seat_no) {
      case 0: // top left
        return { ...base, top: 0, left: 0, width: '50%', height: '33%' };
      case 1: // top right
        return { ...base, top: 0, left: '50%', width: '50%', height: '33%' };
      case 2: // middle left
        return { ...base, top: '33%', left: 0, width: '50%', height: '33%' };
      case 3: // middle right
        return { ...base, top: '33%', left: '50%', width: '50%', height: '33%' };
      case 4: // bottom left
        return { ...base, top: '66%', left: 0, width: '50%', height: '33%' };
      case 5: // bottom right
        return { ...base, top: '66%', left: '50%', width: '50%', height: '33%' };
      default:
        return { ...base };
    }
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
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    //border: `1px solid ${theme.palette.grey['500']}`,
    borderRadius: '2px',
    width: '100%',
    height: '100%',
    maskImage: 'radial-gradient(circle, white 100%, black 100%)',
  },
});

export default makeStyles(styles);
