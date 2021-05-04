import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme: any) => ({
  base: {
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      width: '240px',
      height: '160px',
    },
    [theme.breakpoints.only('xs')]: {
      width: '80px',
      height: '100px',
    },
    // border: `2px solid blue`, // TODO
  },
  playerContainer: ({ position }: { position: any }) => {
    const base = {
      // border: '1px solid red',
    };

    switch (position) {
      case 1: // bottom left
        return {
          ...base,
          [theme.breakpoints.up('sm')]: {
            top: 'calc(50% + 160px)',
            left: 'calc(50% - 350px)',
          },
          [theme.breakpoints.only('xs')]: {
            top: 'calc(50% + 100px)',
            left: 'calc(50% - 100px)',
          },
          transform: 'translate(-100%, -50%)',
        };
      case 2: // top left
        return {
          ...base,
          [theme.breakpoints.up('sm')]: {
            top: 'calc(50% - 160px)',
            left: 'calc(50% - 350px)',
          },
          [theme.breakpoints.only('xs')]: {
            top: 'calc(50% - 100px)',
            left: 'calc(50% - 100px)',
          },
          transform: 'translate(-100%, -50%)',
        };
      case 3: // top
        return {
          ...base,
          [theme.breakpoints.up('sm')]: {
            top: 'calc(50% - 200px)',
          },
          [theme.breakpoints.only('xs')]: {
            top: 'calc(50% - 200px)',
          },
          left: '50%',
          transform: 'translate(-50%, -100%)',
        };
      case 4: // top right
        return {
          ...base,
          [theme.breakpoints.up('sm')]: {
            top: 'calc(50% - 160px)',
            left: 'calc(50% + 350px)',
          },
          [theme.breakpoints.only('xs')]: {
            top: 'calc(50% - 100px)',
            left: 'calc(50% + 100px)',
          },
          transform: 'translate(0%, -50%)',
        };
      case 5: // bottom right
        return {
          ...base,
          [theme.breakpoints.up('sm')]: {
            top: 'calc(50% + 160px)',
            left: 'calc(50% + 350px)',
          },
          [theme.breakpoints.only('xs')]: {
            top: 'calc(50% + 100px)',
            left: 'calc(50% + 100px)',
          },
          transform: 'translate(0%, -50%)',
        };
      default:
        return base;
    }
  },
}));
