import { Theme } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  '@keyframes onHeroTurnAvatarBlinkAnimation': {
    '50%': {
      boxShadow: `0px 0px 12px 12px ${yellow[500]}`,
    },
  },
  container: {
    position: 'relative',
    margin: 'auto',
    boxShadow: theme.shadows[4],
    overflow: 'hidden',
    borderRadius: '6px',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '210px',
      height: '140px',
    },
    [theme.breakpoints.only('xs')]: {
      width: '80px',
      height: '100px',
    },
  },
  isTurn: {
    animation: '$onHeroTurnAvatarBlinkAnimation 1s infinite',
  },
}));
