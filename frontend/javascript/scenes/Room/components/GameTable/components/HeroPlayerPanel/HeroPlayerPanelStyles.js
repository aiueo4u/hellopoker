import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors';

const styles = theme => ({
  allin: {
    color: red[400],
    fontSize: '0.625rem',
    fontWeight: theme.typography.fontWeightBold,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: theme.spacing(1 / 4, 1 / 2),
    borderRadius: '2px',
  },
  nickname: {
    color: theme.palette.common.white,
    fontSize: '0.625rem',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '90px',
    margin: 'auto',
  },
  heroHoleCard1: {
    position: 'absolute',
    top: '65px',
    left: 'calc(50% + 40px)',
    transform: 'translate(-50%, -50%)',
  },
  heroHoleCard2: {
    position: 'absolute',
    top: '65px',
    left: 'calc(50% + 60px)',
    transform: 'translate(-50%, -50%)',
  },
  container: ({ player }) => ({
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translate(-50%, 0%)',
    //border: `1px solid red`, // TODO
    textAlign: 'center',
    filter: player && player.state === 'folded' ? 'grayscale(100%)' : '',
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
    top: '64px',
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

export default makeStyles(styles);
