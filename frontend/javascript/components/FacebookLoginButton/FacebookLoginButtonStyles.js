const styles = theme => ({
  button: {
    backgroundColor: '#1877F2',
    width: '300px',
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
