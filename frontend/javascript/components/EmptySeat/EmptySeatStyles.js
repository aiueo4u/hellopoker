const styles = theme => ({
  button: {
    textTransform: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
  },
  container: {
    //border: `1px solid blue`,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

export default styles;
