import { makeStyles } from '@material-ui/styles';

const styles = () => ({
  container: {
    position: 'absolute',
    top: 'calc(50% + 200px)',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    height: '160px',
    width: '300px',
    //border: `2px solid red`, // TODO
  },
});

export default makeStyles(styles);
