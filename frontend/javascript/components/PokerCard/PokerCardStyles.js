import { makeStyles } from '@material-ui/styles';
import FaceBackImage from './faces/back.png';

const styles = theme => ({
  card: ({ rank, suit, size }) => {
    const base = {
      position: 'relative',
      display: 'inline-block',
      width: size === 'small' ? '24px' : size === 'medium' ? '48px' : '72px',
      height: size === 'small' ? '34px' : size === 'medium' ? '68px' : '102px',
      backgroundColor: theme.palette.common.white,
      borderRadius: size === 'small' ? '2px' : size === 'medium' ? '2px' : '4px',
      boxShadow: `0 1px 1px rgba(0, 0, 0, 0.15)`,
      cursor: 'default',
      willChange: 'transform',
      border: `1px solid ${theme.palette.grey['700']}`,
      [theme.breakpoints.only('xs')]: {
        width: size === 'small' ? '12px' : size === 'medium' ? '24px' : '36px',
        height: size === 'small' ? '17px' : size === 'medium' ? '34px' : '51px',
      },
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
    top: size === 'medium' ? '60%' : '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: size === 'small' ? '2rem' : size === 'medium' ? '2.5rem' : '3rem',
    [theme.breakpoints.only('xs')]: {
      top: size === 'medium' ? '70%' : '60%',
      fontSize: size === 'small' ? '0.75rem' : size === 'medium' ? '0.875rem' : '1.5rem',
    },
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
        fontSize: size === 'small' ? '1.5rem' : size === 'medium' ? '1.25rem' : '1.5rem',
        textAlign: 'center',
        lineHeight: size === 'small' ? '0.675rem' : '0.875rem',
        whiteSpace: 'pre-line',
        letterSpacing: '-0.1rem',
        top: size === 'small' ? '4px' : size === 'medium' ? '8px' : '8px',
        left: size === 'small' ? '4px' : size === 'medium' ? '4px' : '8px',
        content: `"${content}"`,
        [theme.breakpoints.only('xs')]: {
          top: '2px',
          left: '2px',
          fontSize: '1rem',
        },
      },
    };
  },
  suit: ({ suit }) => ({
    color: suit === 's' || suit === 'c' ? theme.palette.common.black : 'red',
  }),
});

export default makeStyles(styles);
