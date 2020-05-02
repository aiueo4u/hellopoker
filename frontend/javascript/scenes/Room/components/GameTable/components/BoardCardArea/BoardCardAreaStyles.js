import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    position: 'relative',
    height: '60px',
  },
  card1: {
    position: 'absolute',
    left: 'calc(50% - 72px)',
    transform: 'translate(-50%, 0%)',
  },
  card2: {
    position: 'absolute',
    left: 'calc(50% - 36px)',
    transform: 'translate(-50%, 0%)',
  },
  card3: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0%)',
  },
  card4: {
    position: 'absolute',
    left: 'calc(50% + 36px)',
    transform: 'translate(-50%, 0%)',
  },
  card5: {
    position: 'absolute',
    left: 'calc(50% + 72px)',
    transform: 'translate(-50%, 0%)',
  },
});

export default makeStyles(styles);
