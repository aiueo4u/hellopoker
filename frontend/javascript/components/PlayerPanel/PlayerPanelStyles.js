import { red } from '@material-ui/core/colors';

const styles = theme => ({
  activePanel: {},
  avatar: {
    border: `1px solid ${theme.palette.common.white}`,
  },
  avatarInTurn: {
    animation: '$onPlayerTurnAvatarBlinkAnimation 1s infinite',
  },
  betAmount: ({ position }) => {
    const base = {
      position: 'absolute',
      borderRadius: theme.spacing(1 / 4),
      color: theme.palette.common.white,
      padding: theme.spacing(1 / 4, 1 / 2),
      //border: '1px solid red',
    };

    switch (position) {
      case 'top':
        return {
          ...base,
          left: '50%',
          transform: 'translate(-50%, 100%)',
          [theme.breakpoints.up('sm')]: {
            bottom: '-48px',
          },
          [theme.breakpoints.only('xs')]: {
            bottom: '-36px',
          },
        };
      case 'right':
        return {
          ...base,
          [theme.breakpoints.up('sm')]: {
            top: '50%',
            left: '-120px',
            transform: 'translate(-100%, -50%)',
          },
          [theme.breakpoints.only('xs')]: {
            top: '50%',
            left: 0,
            transform: 'translate(-100%, -50%)',
          },
        };
      case 'left':
        return {
          ...base,
          [theme.breakpoints.up('sm')]: {
            top: '50%',
            right: '-120px',
            transform: 'translate(100%, -50%)',
          },
          [theme.breakpoints.only('xs')]: {
            top: '50%',
            right: 0,
            transform: 'translate(100%, -50%)',
          },
        };
      default:
        return base;
    }
  },
  dealerButton: ({ position }) => {
    const base = {
      position: 'absolute',
    };

    switch (position) {
      case 'top':
        return {
          ...base,
          [theme.breakpoints.up('sm')]: {
            left: '50%',
            bottom: '-14px',
            transform: 'translate(-50%, 100%)',
          },
          [theme.breakpoints.only('xs')]: {
            left: '50%',
            transform: 'translate(-50%, 20%)',
          },
        };
      case 'left':
        return {
          ...base,
          [theme.breakpoints.up('sm')]: {
            top: '50%',
            right: '-80px',
            transform: 'translate(100%, -50%)',
          },
          [theme.breakpoints.only('xs')]: {
            bottom: 0,
            right: 0,
            transform: 'translate(120%, 0%)',
          },
        };
      case 'right':
        return {
          ...base,
          [theme.breakpoints.up('sm')]: {
            top: '50%',
            left: '-80px',
            transform: 'translate(-100%, -50%)',
          },
          [theme.breakpoints.only('xs')]: {
            bottom: 0,
            left: 0,
            transform: 'translate(-120%, 0%)',
          },
        };
      default:
        return base;
    }
  },
  foldedPanel: {
    filter: 'grayscale(100%)',
  },
  nickname: {
    color: theme.palette.common.white,
    fontSize: '0.625rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '90px',
  },
  panelContainer: ({ player }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //border: `1px solid red`, // TODO
    textAlign: 'center',
    filter: player && player.state === 'folded' ? 'grayscale(100%)' : '',
  }),
  progress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  result: ({ player }) => ({
    color: player.amount_diff > 0 ? 'orange' : 'white',
  }),
  allin: {
    color: red[400],
    fontWeight: theme.typography.fontWeightBold,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: theme.spacing(1 / 4, 1 / 2),
    borderRadius: '2px',
  },
  stackSize: ({ player }) => ({
    display: 'inline',
    color: player && player.state === 'folded' ? theme.palette.grey['500'] : 'orange',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: theme.spacing(1 / 4, 1 / 2),
    borderRadius: '2px',
  }),
  '@keyframes onPlayerTurnAvatarBlinkAnimation': {
    '50%': {
      boxShadow: '0 3px 15px 1px yellow',
    },
  },
});

export default styles;
