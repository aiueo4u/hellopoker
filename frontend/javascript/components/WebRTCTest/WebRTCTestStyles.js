import { makeStyles } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';

const styles = theme => ({
  '@keyframes onHeroTurnAvatarBlinkAnimation': {
    '50%': {
      boxShadow: '0px 0px 8px 2px yellow',
    },
  },
  actionType: {
    color: theme.palette.common.white,
  },
  allin: {
    color: red[400],
  },
  container: {
    position: 'relative',
    width: '200px',
    height: '150px',
    margin: 'auto',
    boxShadow: theme.shadows[4],
    [theme.breakpoints.only('xs')]: {
      width: '100px',
      height: '75px',
    },
  },
  isTurn: {
    animation: '$onHeroTurnAvatarBlinkAnimation 1s infinite',
  },
  nickname: {
    position: 'absolute',
    top: 0,
    left: 0,
    color: theme.palette.common.white,
    fontSize: theme.typography.caption.fontSize,
    background: theme.palette.grey[900],
    padding: '2px 4px',
  },
  status: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 0%)',
    color: 'orange',
    background: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    fontSize: '13px',
    lineHeight: '19px',
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
    //border: `4px solid ${theme.palette.grey['500']}`,
    width: '100%',
    height: '100%',
    maskImage: 'radial-gradient(circle, white 100%, black 100%)',
  },
});

export default makeStyles(styles);
