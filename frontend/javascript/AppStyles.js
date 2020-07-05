import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  content: {
    width: '100%',
    //height: 'calc(var(--vh, 1vh) * 100)',
    overflow: 'scroll',
  },
  menuIconButton: {
    position: 'fixed',
    top: theme.spacing(1),
    left: theme.spacing(1),
  },
});

export default makeStyles(styles);
