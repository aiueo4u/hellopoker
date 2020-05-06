const styles = theme => ({
  button: {
    color: 'orange',
    borderColor: 'orange',
    width: '90px',
    margin: theme.spacing(0, 2),
    touchAction: 'manipulation',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
  },
  container: {
    position: 'absolute',
    bottom: '-30px',
    left: '50%',
    transform: 'translate(-50%, 100%)',
    // border: `1px solid green`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default styles;
