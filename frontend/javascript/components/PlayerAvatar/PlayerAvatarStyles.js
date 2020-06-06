import { makeStyles } from '@material-ui/styles';

const styles = () => ({
  avatar: {
    width: '60px',
    height: '60px',
  },
  inTurn: {
    animation: '$onHeroTurnAvatarBlinkAnimation 1s infinite',
  },
  '@keyframes onHeroTurnAvatarBlinkAnimation': {
    '50%': {
      boxShadow: '0 1px 15px 1px yellow',
    },
  },
});

export default makeStyles(styles);
