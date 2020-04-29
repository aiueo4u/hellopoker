import { makeStyles } from '@material-ui/styles';
import FaceBackImage from './faces/back.png';

const styles = theme => ({
  card: ({ rank, suit, size }) => {
    const base = {
      position: 'relative',
      display: 'inline-block',
      width: size === 'small' ? '12px' : '36px',
      height: size === 'small' ? '17px' : '51px',
      backgroundColor: theme.palette.common.white,
      borderRadius: size === 'small' ? '2px' : '4px',
      boxShadow: `0 1px 1px rgba(0, 0, 0, 0.15)`,
      cursor: 'default',
      willChange: 'transform',
      border: `1px solid ${theme.palette.grey['700']}`,
    };
    return base;
  },
  faceOrBack: ({ invisible }) => {
    return invisible ? {
      position: 'absolute',
      backgroundImage: `url(${FaceBackImage})`,
      backgroundPosition: '50% 50%',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
    } : {
      height: '100%',
      backgroundPosition: '100% 100%',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
    };
  },
  faceSuit: ({ size }) => ({
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: size === 'small' ? '0.75rem' : '1.5rem',
  }),
  rank: ({ rank, size }) => {
    if (!rank) return null;

    let content = '';

    switch (rank) {
      case 'T':
        content = '10';
      case 'J':
        content = 'J';
      case 'Q':
        content = 'Q';
      case 'K':
        content = 'K';
      case 'A':
        content = 'A';
      default:
        content = rank;
    }

    return {
      '&:before': {
        position: 'absolute',
        fontSize: size === 'small' ? '0.675rem' : '0.875rem',
        textAlign: 'center',
        lineHeight: size === 'small' ? '0.675rem' : '0.875rem',
        whiteSpace: 'pre-line',
        letterSpacing: '-0.1rem',
        top: size === 'small' ? '2px' : '4px',
        left: size === 'small' ? '2px' : '4px',
        content: `"${content}"`,
      },
    };
  },
  suit: ({ suit }) => ({
    color: suit === 's' || suit === 'c' ? theme.palette.common.black : 'red',
  }),
});

export default makeStyles(styles);
