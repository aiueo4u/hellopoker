import { makeStyles } from '@material-ui/styles';

const styles = () => ({
  playerContainer: ({ position }) => {
    const base = {
      position: 'absolute',
      width: '300px',
      height: '180px',
      //border: `2px solid red`, // TODO
    };

    switch (position) {
      case 1: // bottom left
        return { ...base, top: 'calc(50% + 160px)', transform: 'translate(0%, -50%)' };
      case 2: // top left
        return { ...base, top: 'calc(50% - 160px)', transform: 'translate(0%, -50%)' };
      case 3: // top
        return {
          ...base,
          top: 'calc(50% - 380px)',
          left: '50%',
          transform: 'translate(-50%, 0%)',
        };
      case 4: // top right
        return { ...base, top: 'calc(50% - 160px)', right: 0, transform: 'translate(0%, -50%)' };
      case 5: // bottom right
        return { ...base, top: 'calc(50% + 160px)', right: 0, transform: 'translate(0%, -50%)' };
      default:
        return base;
    }
  },
});

export default makeStyles(styles);
