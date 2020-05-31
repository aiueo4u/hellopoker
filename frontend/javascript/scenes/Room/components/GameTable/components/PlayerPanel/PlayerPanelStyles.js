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
    };

    switch (position) {
      case 'top':
        return {
          ...base,
          left: '50%',
          bottom: '-32px', // ディーラーボタンのサイズ
          transform: 'translate(-50%, 100%)',
        };
      case 'right':
        return {
          ...base,
          top: '55%',
          left: '-32px',
          transform: 'translate(-100%, 0%)',
        };
      case 'left':
        return {
          ...base,
          top: '55%',
          right: '-32px',
          transform: 'translate(100%, 0%)',
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
          left: '50%',
          bottom: 0,
          transform: 'translate(-50%, 100%)',
        };
      case 'left':
        return {
          ...base,
          top: '50%',
          right: '-20px',
          transform: 'translate(100%, -100%)',
        };
      case 'right':
        return {
          ...base,
          top: '50%',
          left: '-20px',
          transform: 'translate(-100%, -100%)',
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
  handContainer: {
    position: 'absolute',
    bottom: '8px',
    left: '100%',
    transform: 'translate(-50%, 0%)',
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
