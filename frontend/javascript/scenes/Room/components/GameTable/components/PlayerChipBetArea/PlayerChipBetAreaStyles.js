const styles = theme => ({
  buttonPlate: {
    height: '30px',
    width: '30px',
    borderRadius: '15px',
    lineHeight: '30px',
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    textAlign: 'center',
    //border: `1px solid yellow`,
  },
  betArea: {
    borderRadius: theme.spacing(1 / 4),
    color: theme.palette.common.white,
    fontSize: theme.typography.caption.fontSize,
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1 / 4, 1 / 2),
  },
  result: ({ player }) => ({
    borderRadius: '4px',
    fontSize: theme.typography.caption.fontSize,
    color: player && player.amount_diff > 0 ? 'orange' : 'white',
    padding: theme.spacing(1),
  }),
});

export default styles;
