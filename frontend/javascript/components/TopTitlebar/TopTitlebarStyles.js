const styles = theme => ({
  container: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    background: 'rgba(0, 0, 0, 0.7)',
    padding: theme.spacing(1),
    zIndex: theme.zIndex.appBar,
    borderRadius: '2px',
  },
  title: {
    color: theme.palette.common.white,
    display: 'inline-block',
  },
});

export default styles;
