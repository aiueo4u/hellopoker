const styles = theme => ({
  button: {
    color: theme.palette.common.white,
    width: '100%',
    backgroundColor: theme.palette.twitter.main,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.twitter.main,
    },
  },
  icon: {
    width: '30px',
    height: 'auto',
  },
});

export default styles;
