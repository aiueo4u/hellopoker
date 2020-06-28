import { makeStyles } from '@material-ui/styles';

const styles = () => ({
  player: ({ seatNo }) => {
    const base = {
      position: 'absolute',
      //border: `1px solid blue`,
    };

    switch (seatNo) {
      case 1: // bottom
        return { ...base, left: '50%', bottom: '5%', transform: 'translate(-50%, 0%)' };
      case 2: // bottom left
        return { ...base, left: '10%', bottom: '20%' };
      case 3: // top left
        return { ...base, left: '10%', top: '20%' };
      case 4: // top
        return { ...base, left: '50%', top: '5%', transform: 'translate(-50%, 0%)' };
      case 5: // top right
        return { ...base, right: '10%', top: '20%' };
      case 6: // bottom right
        return { ...base, right: '10%', bottom: '20%' };
    }
  },
});

export default makeStyles(styles);
