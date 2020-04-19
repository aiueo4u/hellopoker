import Image from 'assets/climpek.png';

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
    backgroundColor: '#338c00',
    borderRadius: '0%',
  },
  playerChipBetArea: {
    position: 'absolute',
    bottom: '21%',
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
      height: '20%',
      width: '25%',
      //border: `1px solid yellow`, // TODO
    };

    switch (position) {
      case 0:
        return {
          ...base,
          bottom: 0,
          left: '50%',
          transform: 'translate(-50%, 0)',
        };
      case 1:
        return { ...base, top: '60%' };
      case 2:
        return { ...base, top: '20%' };
      case 3:
        return {
          ...base,
          left: '50%',
          transform: 'translate(-50%, 0)',
        };
      case 4:
        return { ...base, top: '20%', right: 0 };
      case 5:
        return { ...base, top: '60%', right: 0 };
      default:
        return base;
    }
  },
});

export default styles;
