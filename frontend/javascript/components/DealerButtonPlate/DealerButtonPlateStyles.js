import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  plate: {
    width: '24px',
    margin: '0 auto',
    background: theme.palette.common.white,
    textAlign: 'center',
    borderRadius: '50%',
    boxShadow: '1px 1px 1px 1px black',
  },
  label: {
    lineHeight: '24px',
  },
});

export default makeStyles(styles);
