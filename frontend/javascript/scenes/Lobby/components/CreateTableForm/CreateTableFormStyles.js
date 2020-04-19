const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'fixed',
    height: '50%',
    width: '80%',
    textAlign: 'center',
    margin: 'auto',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(1),
  },
  formGroup: {
    marginBottom: theme.spacing(2),
  },
});

export default styles;
