import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: ({ player }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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
    // border: '3px solid red', // TODO
    height: '8px',
  },
});

export default makeStyles(styles);
