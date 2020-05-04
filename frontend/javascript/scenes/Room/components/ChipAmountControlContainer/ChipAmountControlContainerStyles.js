const styles = theme => ({
  button: {
    //color: theme.palette.common.white,
    //borderColor: theme.palette.common.white,
    color: 'orange',
    borderColor: 'orange',
    width: '90px',
    //fontSize: theme.typography.subtitle1.fontSize,
    //minWidth: '80px',
    touchAction: 'manipulation',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
  },
  container: {
    position: 'relative',
    height: '100%',
    // border: `1px solid white`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default styles;
