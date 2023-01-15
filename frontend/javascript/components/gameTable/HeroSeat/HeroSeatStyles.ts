import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    // border: '1px solid red',
    [theme.breakpoints.up('sm')]: {
      top: 'calc(50% + 200px)',
      width: '240px',
      height: '160px',
    },
    [theme.breakpoints.only('xs')]: {
      top: 'calc(50% + 180px)',
      width: '80px',
      height: '100px',
    },
    // border: `2px solid red`, // TODO
  },
}));
