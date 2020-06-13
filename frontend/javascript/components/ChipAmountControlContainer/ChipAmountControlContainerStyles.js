import { makeStyles } from '@material-ui/styles';
import { orange } from '@material-ui/core/colors';

const styles = () => ({
  button: {
    color: orange[700],
    borderColor: orange[700],
    width: '100px',
    //height: '100%',
    //margin: theme.spacing(0, 2),
    touchAction: 'manipulation',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default makeStyles(styles);
