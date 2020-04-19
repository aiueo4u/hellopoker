const styles = theme => ({
  button: {
    width: '200px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    position: 'fixed',
    height: '50%',
    width: '80%',
    textAlign: 'center',
    margin: 'auto',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
  },
});

export default styles;
