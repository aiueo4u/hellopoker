const styles = theme => ({
  container: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    background: 'rgba(0, 0, 0, 0.7)',
    padding: theme.spacing(1),
    zIndex: theme.zIndex.appBar,
    borderRadius: '2px',
  },
  handCount: {
    color: theme.palette.common.white,
    display: 'inline-block',
  },
  round: {
    color: theme.palette.common.white,
    display: 'inline-block',
    marginRight: theme.spacing(1),
  },
});

export default styles;
