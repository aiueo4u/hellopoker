const styles = theme => ({
  button: {
    width: '220px',
    backgroundColor: '#1877F2',
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
