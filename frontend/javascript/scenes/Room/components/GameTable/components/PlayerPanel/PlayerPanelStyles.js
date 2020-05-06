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
          top: '45%',
          left: '-12px',
          transform: 'translate(-100%, 0%)',
        };
      case 'left':
        return {
          ...base,
          top: '45%',
          right: '-12px',
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
          top: '40%',
          right: '-5px',
          transform: 'translate(100%, -100%)',
        };
      case 'right':
        return {
          ...base,
          top: '40%',
          left: '-5px',
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
    width: '90px',
  },
  handContainer: {
    position: 'absolute',
    top: '45px',
    left: '50%',
    transform: 'translate(-50%, 0%)',
  },
  panelContainer: ({ player }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //border: `1px solid red`, // TODO
    textAlign: 'center',
    filter: player && player.state === 1 ? 'grayscale(100%)' : '',
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
  actionType: {
    color: theme.palette.common.white,
    fontSize: '0.625rem',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: theme.spacing(1 / 4, 1 / 2),
    borderRadius: '2px',
  },
  stackSize: ({ player }) => ({
    display: 'inline',
    color: player && player.state === 1 ? theme.palette.grey['500'] : 'orange',
    fontSize: theme.typography.caption.fontSize,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: theme.spacing(1 / 4, 1 / 2),
    borderRadius: '2px',
  }),
  statusCard: {
    display: 'flex',
    flexDirection: 'column',
    height: '30px',
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
