const styles = theme => ({
  button: {
    color: 'orange',
    borderColor: 'orange',
    width: '80px',
    margin: theme.spacing(0, 2),
    touchAction: 'manipulation',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    [theme.breakpoints.only('xs')]: {
      margin: theme.spacing(0, 1),
    },
  },
  container: {
    position: 'absolute',
    bottom: '-40px',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    // border: `1px solid green`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    [theme.breakpoints.up('sm')]: {
      //bottom: '-64px',
    },
  },
});

export default styles;
