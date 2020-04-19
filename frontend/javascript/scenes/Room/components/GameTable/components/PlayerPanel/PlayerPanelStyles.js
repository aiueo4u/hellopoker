const styles = theme => ({
  activePanel: {},
  avatar: {
    margin: 'auto',
    border: `1px solid ${theme.palette.common.white}`,
    animation: ({ isTurn }) => (isTurn ? 'onPlayerTurnAvatarBlinkAnimation 1s infinite' : ''),
  },
  betAmount: ({ position }) => {
    const base = {
      position: 'absolute',
      borderRadius: theme.spacing(1 / 4),
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      color: theme.palette.common.white,
      padding: theme.spacing(1 / 2, 1),
    };
    switch (position) {
      case 'top':
        return {
          ...base,
          left: '50%',
          bottom: '-32px', // ディーラーボタンのサイズ
          transform: 'translate(-50%, 100%)',
        };
      case 'left':
        return {
          ...base,
          top: '50%',
          right: 0,
          transform: 'translate(100%, 0%)',
        };
      case 'right':
        return {
          ...base,
          top: '50%',
          left: 0,
          transform: 'translate(-100%, 0%)',
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
          right: 0,
          transform: 'translate(100%, -100%)',
        };
      case 'right':
        return {
          ...base,
          top: '50%',
          left: 0,
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
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  panelContainer: ({ player }) => ({
    position: 'relative',
    //border: `1px solid white`, // TODO
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    filter: player && player.state === 1 ? 'grayscale(100%)' : '',
  }),
  stackSize: {
    color: 'orange',
  },
  statusCard: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '140px',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    margin: '8px auto',
    padding: theme.spacing(1 / 2),
    borderRadius: '2px',
  },
  '@keyframes onPlayerTurnAvatarBlinkAnimation': {
    '50%': {
      boxShadow: '0 3px 15px 1px yellow',
    },
  },
});

export default styles;
