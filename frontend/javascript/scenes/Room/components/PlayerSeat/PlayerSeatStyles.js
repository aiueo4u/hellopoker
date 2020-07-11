import { makeStyles } from '@material-ui/styles';

const styles = theme => ({
  base: {
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      width: '320px',
      height: '180px',
    },
    [theme.breakpoints.only('xs')]: {
      width: '94px',
      height: '54px',
    },
    //border: `2px solid red`, // TODO
  },
  playerContainer: ({ position }) => {
    const base = {};

    switch (position) {
      case 1: // bottom left
        return {
          ...base,
          [theme.breakpoints.up('sm')]: {
            top: 'calc(50% + 160px)',
          },
          [theme.breakpoints.only('xs')]: {
            top: 'calc(50% + 100px)',
          },
          transform: 'translate(0%, -50%)',
        };
      case 2: // top left
        return {
          ...base,
          [theme.breakpoints.up('sm')]: {
            top: 'calc(50% - 160px)',
          },
          [theme.breakpoints.only('xs')]: {
            top: 'calc(50% - 100px)',
          },
          transform: 'translate(0%, -50%)',
        };
      case 3: // top
        return {
          ...base,
          [theme.breakpoints.up('sm')]: {
            top: 'calc(50% - 380px)',
          },
          [theme.breakpoints.only('xs')]: {
            top: 'calc(50% - 280px)',
          },
          left: '50%',
          transform: 'translate(-50%, 0%)',
        };
      case 4: // top right
        return {
          ...base,
          [theme.breakpoints.up('sm')]: {
            top: 'calc(50% - 160px)',
          },
          [theme.breakpoints.only('xs')]: {
            top: 'calc(50% - 100px)',
          },
          right: 0,
          transform: 'translate(0%, -50%)',
        };
      case 5: // bottom right
        return {
          ...base,
          [theme.breakpoints.up('sm')]: {
            top: 'calc(50% + 160px)',
          },
          [theme.breakpoints.only('xs')]: {
            top: 'calc(50% + 100px)',
          },
          right: 0,
          transform: 'translate(0%, -50%)',
        };
      default:
        return base;
    }
  },
});

export default makeStyles(styles);
