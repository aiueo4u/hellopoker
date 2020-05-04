const styles = theme => ({
  button: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    textTransform: 'none',
    height: '60px',
    width: '60px',
    touchAction: 'manipulation',
    borderRadius: '30px',
  },
  leftButton: {
    left: 'calc(50% - 135px)',
  },
  rightButton: {
    left: 'calc(50% + 135px)',
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
    top: '40px',
    left: 'calc(50% + 40px)',
    transform: 'translate(-50%, -50%)',
  },
  heroHoleCard2: {
    position: 'absolute',
    top: '40px',
    left: 'calc(50% + 70px)',
    transform: 'translate(-50%, -50%)',
  },
  panelContainer: ({ player }) => ({
    position: 'absolute',
    left: '50%',
    bottom: '24px',
    transform: 'translate(-50%, 0%)',
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
    position: 'absolute',
    bottom: '-24px',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    //border: '1px solid red', // TODO
    display: 'flex',
    flexDirection: 'column',
    height: '30px',
    width: '140px',
    margin: '4px auto',
  },
});

export default styles;
