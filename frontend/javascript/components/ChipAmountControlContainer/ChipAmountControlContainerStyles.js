const styles = theme => ({
  button: {
    color: 'orange',
    borderColor: 'orange',
    width: '90px',
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
    width: 'calc(var(--vw, 1vw) * 100)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default styles;
