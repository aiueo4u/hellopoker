import { makeStyles } from '@material-ui/styles';

const styles = () => ({
  '@keyframes deal0l': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: 'calc(50% + 350px)',
      left: 'calc(50% + 120px)',
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal0r': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: 'calc(50% + 350px)',
      left: 'calc(50% + 160px)',
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal1l': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: 'calc(50% + 200px)',
      left: 'calc(50% - 380px)',
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal1r': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: 'calc(50% + 200px)',
      left: 'calc(50% - 340px)',
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal2l': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: 'calc(50% - 120px)',
      left: 'calc(50% - 380px)',
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal2r': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: 'calc(50% - 120px)',
      left: 'calc(50% - 340px)',
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal3l': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: 'calc(50% - 260px)',
      left: 'calc(50% + 100px)',
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal3r': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: 'calc(50% - 260px)',
      left: 'calc(50% + 140px)',
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal4l': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: 'calc(50% - 120px)',
      left: 'calc(50% + 340px)',
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal4r': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: 'calc(50% - 120px)',
      left: 'calc(50% + 380px)',
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal5l': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: 'calc(50% + 200px)',
      left: 'calc(50% + 340px)',
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal5r': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: 'calc(50% + 200px)',
      left: 'calc(50% + 380px)',
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  base: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  dealt0Left: { top: 'calc(50% + 350px)', left: 'calc(50% + 120px)' },
  dealt0Right: { top: 'calc(50% + 350px)', left: 'calc(50% + 160px)' },
  dealt1Left: { top: 'calc(50% + 200px)', left: 'calc(50% - 380px)' },
  dealt1Right: { top: 'calc(50% + 200px)', left: 'calc(50% - 340px)' },
  dealt2Left: { top: 'calc(50% - 120px)', left: 'calc(50% - 380px)' },
  dealt2Right: { top: 'calc(50% - 120px)', left: 'calc(50% - 340px)' },
  dealt3Left: { top: 'calc(50% - 260px)', left: 'calc(50% + 100px)' },
  dealt3Right: { top: 'calc(50% - 260px)', left: 'calc(50% + 140px)' },
  dealt4Left: { top: 'calc(50% - 120px)', left: 'calc(50% + 380px)' },
  dealt4Right: { top: 'calc(50% - 120px)', left: 'calc(50% + 340px)' },
  dealt5Left: { top: 'calc(50% + 200px)', left: 'calc(50% + 380px)' },
  dealt5Right: { top: 'calc(50% + 200px)', left: 'calc(50% + 340px)' },
  position0Left: { animation: '$deal0l 0.6s 0.0s forwards' },
  position1Left: { animation: '$deal1l 0.6s 0.1s forwards' },
  position2Left: { animation: '$deal2l 0.6s 0.2s forwards' },
  position3Left: { animation: '$deal3l 0.6s 0.3s forwards' },
  position4Left: { animation: '$deal4l 0.6s 0.4s forwards' },
  position5Left: { animation: '$deal5l 0.6s 0.5s forwards' },
  position0Right: { animation: '$deal0r 0.6s 0.6s forwards' },
  position1Right: { animation: '$deal1r 0.6s 0.7s forwards' },
  position2Right: { animation: '$deal2r 0.6s 0.8s forwards' },
  position3Right: { animation: '$deal3r 0.6s 0.9s forwards' },
  position4Right: { animation: '$deal4r 0.6s 1.0s forwards' },
  position5Right: { animation: '$deal5r 0.6s 1.1s forwards' },
});

export default makeStyles(styles);
