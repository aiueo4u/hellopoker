const styles = theme => ({
  buttonPlate: {
    height: '30px',
    width: '30px',
    borderRadius: '15px',
    lineHeight: '30px'
  },
  playerChipBetArea: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    textAlign: 'center'
  },
  betArea: {
    background: 'rgba(0, 0, 0, 0.4)',
    borderRadius: theme.spacing(1 / 4),
    color: theme.palette.common.white,
    padding: theme.spacing(1 / 4)
  },
  result: ({ player }) => ({
    background: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '4px',
    color: player && player.amount_diff > 0 ? 'orange' : 'white',
    padding: theme.spacing(1)
  })
});

export default styles;
