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
      fontSize: theme.typography.caption.fontSize,
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
          top: '50%',
          left: 0,
          transform: 'translate(-100%, 0%)',
        };
      case 'left':
        return {
          ...base,
          top: '50%',
          right: 0,
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
    fontSize: theme.typography.caption.fontSize,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  handContainer: {
    position: 'absolute',
    top: '42px',
    left: '50%',
    transform: 'translate(-50%, 0%)',
  },
  panelContainer: ({ player }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //border: `1px solid yellow`, // TODO
    textAlign: 'center',
    filter: player && player.state === 1 ? 'grayscale(100%)' : '',
  }),
  progress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  stackSize: {
    display: 'inline',
    color: 'orange',
    fontSize: theme.typography.caption.fontSize,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: theme.spacing(1 / 4, 1 / 2),
    borderRadius: '2px',
  },
  statusCard: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '140px',
    marginTop: theme.spacing(1 / 2),
  },
  '@keyframes onPlayerTurnAvatarBlinkAnimation': {
    '50%': {
      boxShadow: '0 3px 15px 1px yellow',
    },
  },
});

export default styles;
