import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  content: {
    overflow: 'scroll',
    [theme.breakpoints.up('sm')]: {
      minWidth: '800px',
      minHeight: '600px',
    },
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  menuIconButton: {
    position: 'fixed',
    top: theme.spacing(1),
    left: theme.spacing(1),
  },
});

export default makeStyles(styles);
