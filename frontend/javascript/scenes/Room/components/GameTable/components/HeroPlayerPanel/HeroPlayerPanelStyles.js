import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  heroHoleCard1: {
    position: 'absolute',
    bottom: '5px',
    left: 'calc(50% + 90px)',
    transform: 'translate(0%, 0%)',
    [theme.breakpoints.only('xs')]: {
      left: 'calc(50% + 40px)',
    },
  },
  heroHoleCard2: {
    position: 'absolute',
    bottom: '5px',
    left: 'calc(50% + 140px)',
    transform: 'translate(0%, 0%)',
    [theme.breakpoints.only('xs')]: {
      left: 'calc(50% + 65px)',
    },
  },
  container: ({ player }) => ({
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 0%)',
    //border: `3px solid red`, // TODO
    textAlign: 'center',
    filter: player && player.state === 'folded' ? 'grayscale(100%)' : '',
  }),
  stackSize: {
    display: 'inline-block',
    color: 'orange',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: theme.spacing(1 / 4, 1 / 2),
    borderRadius: '4px',
  },
  statusCard: {
    //border: '3px solid red', // TODO
    height: '8px',
  },
});

export default makeStyles(styles);
