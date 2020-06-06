import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  content: {
    position: 'fixed',
    top: 0,
    left: '220px',
    width: 'calc(100vw - 220px)',
    height: 'calc(var(--vh, 1vh) * 100)',
    // border: `1px solid blue`,
  },
  sideBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '220px',
    height: 'calc(var(--vh, 1vh) * 100)',
    borderRight: `1px solid ${theme.palette.grey[300]}`,
    // border: `1px solid gray`,
  },
});

export default makeStyles(styles);
