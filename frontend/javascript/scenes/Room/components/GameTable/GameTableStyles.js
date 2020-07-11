import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import BackgroundImage from 'assets/climpek.png';

const styles = theme => ({
  container: {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '800px',
      maxHeight: '400px',
      borderRadius: '200px',
    },
    [theme.breakpoints.only('xs')]: {
      maxWidth: '300px',
      maxHeight: '500px',
      borderRadius: '150px',
    },
    backgroundImage: `url(${BackgroundImage})`,
    backgroundColor: green[200],
    border: `1px solid ${theme.palette.grey[700]}`,
    //border: `1px solid blue`,
    boxShadow: theme.shadows[8],
  },
  playerChipBetArea: {
    position: 'absolute',
    bottom: '16px',
    left: '50%',
    transform: 'translate(-50%, 0)',
    //border: `1px solid red`,
  },
});

export default makeStyles(styles);
