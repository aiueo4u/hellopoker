import { makeStyles } from '@material-ui/styles';

const styles = theme => ({
  '@keyframes onHeroTurnAvatarBlinkAnimation': {
    '50%': {
      boxShadow: '0px 0px 8px 2px yellow',
    },
  },
  container: {
    width: '80px',
    height: '60px',
    margin: 'auto',
    boxShadow: theme.shadows[4],
  },
  isTurn: {
    animation: '$onHeroTurnAvatarBlinkAnimation 1s infinite',
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
    width: '100%',
    height: '100%',
    maskImage: 'radial-gradient(circle, white 100%, black 100%)',
  },
});

export default makeStyles(styles);
