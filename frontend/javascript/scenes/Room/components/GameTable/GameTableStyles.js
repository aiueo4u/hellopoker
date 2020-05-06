//import Image from 'assets/climpek.png';
import Image from 'assets/background.jpg';
import { green } from '@material-ui/core/colors';

const styles = theme => ({
  centralContainer: {
    position: 'absolute',
    width: '50%',
    height: '300px',
    maxWidth: '300px',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    textAlign: 'center',
  },
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    maxWidth: '640px',
    margin: 'auto',
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backgroundBlendMode: 'darken',
    //backgroundColor: green['700'],
    //backgroundColor: theme.palette.grey['900'],
    borderRadius: '0%',
  },
  playerChipBetArea: {
    position: 'absolute',
    bottom: '160px',
    left: '50%',
    transform: 'translate(-50%, 0)',
    //border: `1px solid white`,
  },
  heroPlayerContainer: {
    height: '150px',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 0)',
    //border: `1px solid white`,
  },
  playerContainer: ({ position }) => {
    const base = {
      position: 'absolute',
      height: '25%',
      width: '25%',
      //border: `1px solid yellow`, // TODO
    };

    switch (position) {
      case 0: // bottom
        return {
          ...base,
          bottom: 0,
          left: '50%',
          transform: 'translate(-50%, 0)',
        };
      case 1: // bottom left
        return { ...base, top: '50%' };
      case 2: // top left
        return { ...base, top: '25%' };
      case 3: // top
        return {
          ...base,
          top: 0,
          left: '50%',
          transform: 'translate(-50%, 0)',
        };
      case 4: // top right
        return { ...base, top: '25%', right: 0 };
      case 5: // bottom right
        return { ...base, top: '50%', right: 0 };
      default:
        return base;
    }
  },
});

export default styles;
