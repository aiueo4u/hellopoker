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
    textAlign: 'center'
  },
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    maxWidth: '640px',
    margin: 'auto',
    backgroundImage: `url(${Image})`,
    backgroundColor: '#338c00',
    borderRadius: '0%'
  },
  playerChipBetArea: {
    height: '80px',
    width: '25%',
    position: 'absolute',
    bottom: '150px',
    left: '50%',
    transform: 'translate(-50%, 0)'
    //border: `1px solid white`,
  },
  heroPlayerContainer: {
    height: '150px',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 0)'
    //border: `1px solid white`,
  },
  playerContainer1: {
    height: '20%',
    width: '25%',
    //backgroundColor: 'yellow',
    position: 'absolute',
    top: '400px'
  },
  playerContainer2: {
    height: '20%',
    width: '25%',
    //backgroundColor: 'blue',
    position: 'absolute',
    top: '150px'
  },
  playerContainer3: {
    height: '20%',
    width: '25%',
    //backgroundColor: 'blue',
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)'
  },
  playerContainer4: {
    height: '20%',
    width: '25%',
    //backgroundColor: 'blue',
    position: 'absolute',
    top: '150px',
    right: 0
  },
  playerContainer5: {
    height: '20%',
    width: '25%',
    //backgroundColor: 'yellow',
    position: 'absolute',
    top: '400px',
    right: 0
  }
});

export default styles;
