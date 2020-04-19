const styles = theme => ({
  container: {
    display: 'inline-block',
    fontSize: theme.typography.caption.fontSize,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: theme.palette.common.white,
    padding: theme.spacing(1),
    borderRadius: '2px',
  },
  remain: {
    display: 'inline-block',
    fontSize: theme.typography.h6.fontSize,
    width: '24px',
  },
});

export default styles;
