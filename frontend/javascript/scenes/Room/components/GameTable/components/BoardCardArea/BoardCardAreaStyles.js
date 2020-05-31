import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    position: 'relative',
    height: '60px',
  },
  card1: {
    position: 'absolute',
    left: 'calc(50% - 144px)',
    transform: 'translate(-50%, 0%)',
    [theme.breakpoints.only('xs')]: {
      left: 'calc(50% - 72px)',
    },
  },
  card2: {
    position: 'absolute',
    left: 'calc(50% - 72px)',
    transform: 'translate(-50%, 0%)',
    [theme.breakpoints.only('xs')]: {
      left: 'calc(50% - 36px)',
    },
  },
  card3: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0%)',
  },
  card4: {
    position: 'absolute',
    left: 'calc(50% + 72px)',
    transform: 'translate(-50%, 0%)',
    [theme.breakpoints.only('xs')]: {
      left: 'calc(50% + 36px)',
    },
  },
  card5: {
    position: 'absolute',
    left: 'calc(50% + 144px)',
    transform: 'translate(-50%, 0%)',
    [theme.breakpoints.only('xs')]: {
      left: 'calc(50% + 72px)',
    },
  },
});

export default makeStyles(styles);
