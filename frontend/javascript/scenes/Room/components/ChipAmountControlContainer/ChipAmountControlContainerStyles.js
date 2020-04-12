const styles = theme => ({
  button: {
    backgroundColor: theme.palette.common.white,
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    minWidth: '80px',
    '&:hover': {
      backgroundColor: theme.palette.common.white
    }
  },
  container: {
    position: 'relative',
    height: '100%',
    //border: `1px solid white`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default styles;
