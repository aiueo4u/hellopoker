import { makeStyles } from '@material-ui/styles';

const styles = () => ({
  '@keyframes deal0l': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: 'calc(50% + 330px)',
      left: 'calc(50% + 110px)',
      transform: 'translate(-50%, -50%) rotateZ(1800deg)',
    },
  },
  '@keyframes deal0r': {
    '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
    '100%': {
      top: 'calc(50% + 330px)',
      left: 'calc(50% + 150px)',
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
  '@keyframes show0l': {
    '0%': { top: 'calc(50% + 330px)', left: 'calc(50% + 110px)' },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% + 100px)' },
  },
  '@keyframes show0r': {
    '0%': { top: 'calc(50% + 330px)', left: 'calc(50% + 150px)' },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% + 140px)' },
  },
  '@keyframes show1l': {
    '0%': { top: 'calc(50% + 200px)', left: 'calc(50% - 380px)' },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% - 240px)' },
  },
  '@keyframes show1r': {
    '0%': { top: 'calc(50% + 200px)', left: 'calc(50% - 380px)' },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% - 200px)' },
  },
  '@keyframes show2l': {
    '0%': { top: 'calc(50% - 120px)', left: 'calc(50% - 380px)' },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% - 240px)' },
  },
  '@keyframes show2r': {
    '0%': { top: 'calc(50% - 120px)', left: 'calc(50% - 340px)' },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% - 200px)' },
  },
  '@keyframes show3l': {
    '0%': { top: 'calc(50% - 260px)', left: 'calc(50% + 100px)' },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% + 100px)' },
  },
  '@keyframes show3r': {
    '0%': { top: 'calc(50% - 260px)', left: 'calc(50% + 140px)' },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% + 140px)' },
  },
  '@keyframes show4l': {
    '0%': { top: 'calc(50% - 120px)', left: 'calc(50% + 340px)' },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% + 200px)' },
  },
  '@keyframes show4r': {
    '0%': { top: 'calc(50% - 120px)', left: 'calc(50% + 380px)' },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% + 240px)' },
  },
  '@keyframes show5l': {
    '0%': { top: 'calc(50% + 200px)', left: 'calc(50% + 340px)' },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% + 200px)' },
  },
  '@keyframes show5r': {
    '0%': { top: 'calc(50% + 200px)', left: 'calc(50% + 380px)' },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% + 240px)' },
  },
  '@keyframes muck0l': {
    '0%': { top: 'calc(50% + 330px)', left: 'calc(50% + 110px)' },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% + 100px)', opacity: 0 },
  },
  '@keyframes muck0r': {
    '0%': { top: 'calc(50% + 330px)', left: 'calc(50% + 150px)' },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% + 140px)', opacity: 0 },
  },
  '@keyframes muck1l': {
    '0%': { top: 'calc(50% + 200px)', left: 'calc(50% - 380px)' },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% - 240px)', opacity: 0 },
  },
  '@keyframes muck1r': {
    '0%': { top: 'calc(50% + 200px)', left: 'calc(50% - 380px)' },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% - 200px)', opacity: 0 },
  },
  '@keyframes muck2l': {
    '0%': { top: 'calc(50% - 120px)', left: 'calc(50% - 380px)' },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% - 240px)', opacity: 0 },
  },
  '@keyframes muck2r': {
    '0%': { top: 'calc(50% - 120px)', left: 'calc(50% - 340px)' },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% - 200px)', opacity: 0 },
  },
  '@keyframes muck3l': {
    '0%': { top: 'calc(50% - 260px)', left: 'calc(50% + 100px)' },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% + 100px)', opacity: 0 },
  },
  '@keyframes muck3r': {
    '0%': { top: 'calc(50% - 260px)', left: 'calc(50% + 140px)' },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% + 140px)', opacity: 0 },
  },
  '@keyframes muck4l': {
    '0%': { top: 'calc(50% - 120px)', left: 'calc(50% + 340px)' },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% + 200px)', opacity: 0 },
  },
  '@keyframes muck4r': {
    '0%': { top: 'calc(50% - 120px)', left: 'calc(50% + 380px)' },
    '100%': { top: 'calc(50% - 120px)', left: 'calc(50% + 240px)', opacity: 0 },
  },
  '@keyframes muck5l': {
    '0%': { top: 'calc(50% + 200px)', left: 'calc(50% + 340px)' },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% + 200px)', opacity: 0 },
  },
  '@keyframes muck5r': {
    '0%': { top: 'calc(50% + 200px)', left: 'calc(50% + 380px)' },
    '100%': { top: 'calc(50% + 100px)', left: 'calc(50% + 240px)', opacity: 0 },
  },
  base: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  dealt0Left: { top: 'calc(50% + 330px)', left: 'calc(50% + 110px)' },
  dealt0Right: { top: 'calc(50% + 330px)', left: 'calc(50% + 150px)' },
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
  show0Left: { animation: '$show0l 0.6s 0.0s forwards' },
  show1Left: { animation: '$show1l 0.6s 0.0s forwards' },
  show2Left: { animation: '$show2l 0.6s 0.0s forwards' },
  show3Left: { animation: '$show3l 0.6s 0.0s forwards' },
  show4Left: { animation: '$show4l 0.6s 0.0s forwards' },
  show5Left: { animation: '$show5l 0.6s 0.0s forwards' },
  show0Right: { animation: '$show0r 0.6s 0.0s forwards' },
  show1Right: { animation: '$show1r 0.6s 0.0s forwards' },
  show2Right: { animation: '$show2r 0.6s 0.0s forwards' },
  show3Right: { animation: '$show3r 0.6s 0.0s forwards' },
  show4Right: { animation: '$show4r 0.6s 0.0s forwards' },
  show5Right: { animation: '$show5r 0.6s 0.0s forwards' },
  muck0Left: { animation: '$muck0l 0.6s 0.0s forwards' },
  muck1Left: { animation: '$muck1l 0.6s 0.0s forwards' },
  muck2Left: { animation: '$muck2l 0.6s 0.0s forwards' },
  muck3Left: { animation: '$muck3l 0.6s 0.0s forwards' },
  muck4Left: { animation: '$muck4l 0.6s 0.0s forwards' },
  muck5Left: { animation: '$muck5l 0.6s 0.0s forwards' },
  muck0Right: { animation: '$muck0r 0.6s 0.0s forwards' },
  muck1Right: { animation: '$muck1r 0.6s 0.0s forwards' },
  muck2Right: { animation: '$muck2r 0.6s 0.0s forwards' },
  muck3Right: { animation: '$muck3r 0.6s 0.0s forwards' },
  muck4Right: { animation: '$muck4r 0.6s 0.0s forwards' },
  muck5Right: { animation: '$muck5r 0.6s 0.0s forwards' },
});

export default makeStyles(styles);
