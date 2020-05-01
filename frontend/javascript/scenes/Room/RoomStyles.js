import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    height: 'calc(var(--vh, 1vh) * 100)',
    backgroundColor: theme.palette.common.black,
  },
});

export default makeStyles(styles);
