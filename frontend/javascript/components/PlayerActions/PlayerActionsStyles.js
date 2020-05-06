const styles = theme => ({
  button: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    textTransform: 'none',
    height: '60px',
    width: '60px',
    touchAction: 'manipulation',
    borderRadius: '30px',
  },
  leftButton: {
    left: 'calc(50% - 135px)',
  },
  rightButton: {
    left: 'calc(50% + 135px)',
  },
});

export default styles;
