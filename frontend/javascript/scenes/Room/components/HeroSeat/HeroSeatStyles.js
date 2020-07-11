import { makeStyles } from '@material-ui/styles';

const styles = theme => ({
  container: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    [theme.breakpoints.up('sm')]: {
      top: 'calc(50% + 200px)',
      width: '320px',
      height: '180px',
    },
    [theme.breakpoints.only('xs')]: {
      top: 'calc(50% + 240px)',
      width: '94px',
      height: '54px',
    },
    //border: `2px solid red`, // TODO
  },
});

export default makeStyles(styles);
