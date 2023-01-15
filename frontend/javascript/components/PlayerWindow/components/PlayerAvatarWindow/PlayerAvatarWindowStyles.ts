import { Theme } from '@material-ui/core';
import { orange, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
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
    height: '100%',
    objectFit: 'cover',
  },
  name: {
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
    background: 'rgba(255, 255, 255, 0.7)',
    width: '100%',
    fontSize: '14px',
    lineHeight: '19px',
  },
  stackSize: {
    color: orange[900],
  },
  videoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    // border: `4px solid ${theme.palette.grey['500']}`,
    width: '100%',
    height: '100%',
    maskImage: 'radial-gradient(circle, white 100%, black 100%)',
    '&:hover $micSwitchButton': {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      visibility: 'visible',
    },
  },
}));
