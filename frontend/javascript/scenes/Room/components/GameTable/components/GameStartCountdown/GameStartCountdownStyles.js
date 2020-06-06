import { makeStyles } from '@material-ui/styles';

const styles = theme => ({
  container: {
    position: 'absolute',
    top: '20px',
    left: 0,
    width: '100%',
    display: 'inline-block',
    fontSize: theme.typography.caption.fontSize,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: theme.palette.common.white,
    padding: theme.spacing(0),
    borderRadius: '4px',
  },
  remain: {
    display: 'inline-block',
    fontSize: theme.typography.subtitle1.fontSize,
    color: 'orange',
    width: '24px',
  },
});

export default makeStyles(styles);
