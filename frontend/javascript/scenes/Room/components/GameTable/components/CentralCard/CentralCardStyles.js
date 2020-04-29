import { makeStyles } from '@material-ui/styles';

const styles = theme => ({
  container: {
    position: 'absolute',
    height: '300px',
    width: '50%',
    maxWidth: '300px',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    //border: `1px solid white`, // TODO
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  pot: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: theme.palette.common.white,
    padding: theme.spacing(1),
    width: '100px',
    margin: '16px auto',
    borderRadius: '2px',
  },
});

export default makeStyles(styles);
