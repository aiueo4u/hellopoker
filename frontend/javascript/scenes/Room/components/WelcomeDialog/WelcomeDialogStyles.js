import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  caption: {
    color: theme.palette.grey[500],
    fontSize: theme.typography.caption.fontSize,
  },
});

export default makeStyles(styles);
