import { makeStyles } from '@material-ui/styles';

const styles = theme => ({
  amount: {
    fontSize: theme.typography.body2.fontSize,
  },
  container: {
    position: 'relative',
    display: 'inline-block',
    width: '40px',
  },
});

export default makeStyles(styles);
