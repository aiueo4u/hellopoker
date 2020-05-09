const styles = theme => ({
  button: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    textTransform: 'none',
    height: '64px',
    width: '64px',
    touchAction: 'manipulation',
    borderRadius: '32px',
  },
  leftButton: {
    [theme.breakpoints.only('xs')]: {
      left: 'calc(50% - 112px)',
    },
    [theme.breakpoints.up('sm')]: {
      left: 'calc(50% - 135px)',
    },
  },
  rightButton: {
    [theme.breakpoints.only('xs')]: {
      left: 'calc(50% + 112px)',
    },
    [theme.breakpoints.up('sm')]: {
      left: 'calc(50% + 135px)',
    },
  },
});

export default styles;
