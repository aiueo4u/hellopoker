const styles = theme => ({
  button: {
    backgroundColor: '#1877F2',
    width: '100%',
    color: theme.palette.common.white,
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
