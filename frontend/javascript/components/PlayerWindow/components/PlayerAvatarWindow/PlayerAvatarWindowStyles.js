import { makeStyles } from '@material-ui/styles';
import { orange, red, yellow } from '@material-ui/core/colors';

const styles = theme => ({
  '@keyframes onHeroTurnAvatarBlinkAnimation': {
    '50%': {
      boxShadow: `0px 0px 12px 12px ${yellow[500]}`,
    },
  },
  actionType: {
    color: theme.palette.grey[700],
  },
  allin: {
    color: red[400],
  },
  avatar: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
  },
  container: {
    position: 'relative',
    width: '210px',
    height: '140px',
    margin: 'auto',
    boxShadow: theme.shadows[4],
    overflow: 'hidden',
    [theme.breakpoints.only('xs')]: {
      width: '100px',
      height: '75px',
    },
  },
  emptyImage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  isTurn: {
    animation: '$onHeroTurnAvatarBlinkAnimation 1s infinite',
  },
  micOffIcon: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    color: red[700],
  },
  micSwitchButton: {
    visibility: 'hidden',
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
  startAudioButton: {
    color: theme.palette.grey[700],
    fontSize: theme.typography.caption.fontSize,
  },
  status: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 0%)',
    color: orange[700],
    background: 'rgba(227, 227, 227, 0.5)',
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
    '&:hover $micSwitchButton': {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      visibility: 'visible',
    },
  },
});

export default makeStyles(styles);
