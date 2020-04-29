const styles = theme => ({
  button: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    textTransform: 'none',
    width: '80px',
    touchAction: 'manipulation',
  },
  leftButton: {
    left: 'calc(50% - 120px)',
  },
  rightButton: {
    left: 'calc(50% + 120px)',
  },
  nickname: {
    color: theme.palette.common.white,
    fontSize: theme.typography.caption.fontSize,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  heroHoleCard1: {
    position: 'absolute',
    top: '50px',
    left: 'calc(50% - 15px)',
    transform: 'translate(-50%, -50%)',
  },
  heroHoleCard2: {
    position: 'absolute',
    top: '50px',
    left: 'calc(50% + 15px)',
    transform: 'translate(-50%, -50%)',
  },
  panelContainer: ({ player }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //border: `1px solid white`, // TODO
    textAlign: 'center',
    filter: player && player.state === 1 ? 'grayscale(100%)' : '',
  }),
  stackSize: {
    display: 'inline-block',
    color: 'orange',
    fontSize: theme.typography.caption.fontSize,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: theme.spacing(1/ 4, 1 / 2),
    borderRadius: '4px',
  },
  statusCard: {
    display: 'flex',
    flexDirection: 'column',
    width: '140px',
    margin: '4px auto',
  },
});

export default styles;
