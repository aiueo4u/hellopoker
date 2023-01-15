import { makeStyles } from '@material-ui/styles';

const cardPosition: any = {
  0: {
    // bottom(hero)
    l: {
      sm: { top: 'calc(50% + 330px)', left: 'calc(50% + 110px)' },
      xs: { top: 'calc(50% + 250px)', left: 'calc(50% + 60px)' },
    },
    r: {
      sm: { top: 'calc(50% + 330px)', left: 'calc(50% + 150px)' },
      xs: { top: 'calc(50% + 250px)', left: 'calc(50% + 90px)' },
    },
  },
  1: {
    // bottom left
    l: {
      sm: { top: 'calc(50% + 200px)', left: 'calc(50% - 380px)' },
      xs: { top: 'calc(50% + 175px)', left: 'calc(50% - 160px)' },
    },
    r: {
      sm: { top: 'calc(50% + 200px)', left: 'calc(50% - 340px)' },
      xs: { top: 'calc(50% + 175px)', left: 'calc(50% - 130px)' },
    },
  },
  2: {
    // top left
    l: {
      sm: { top: 'calc(50% - 120px)', left: 'calc(50% - 380px)' },
      xs: { top: 'calc(50% - 25px)', left: 'calc(50% - 160px)' },
    },
    r: {
      sm: { top: 'calc(50% - 120px)', left: 'calc(50% - 340px)' },
      xs: { top: 'calc(50% - 25px)', left: 'calc(50% - 130px)' },
    },
  },
  3: {
    // top
    l: {
      sm: { top: 'calc(50% - 260px)', left: 'calc(50% + 100px)' },
      xs: { top: 'calc(50% - 220px)', left: 'calc(50% + 60px)' },
    },
    r: {
      sm: { top: 'calc(50% - 260px)', left: 'calc(50% + 140px)' },
      xs: { top: 'calc(50% - 220px)', left: 'calc(50% + 90px)' },
    },
  },
  4: {
    // top right
    l: {
      sm: { top: 'calc(50% - 120px)', left: 'calc(50% + 340px)' },
      xs: { top: 'calc(50% - 25px)', left: 'calc(50% + 130px)' },
    },
    r: {
      sm: { top: 'calc(50% - 120px)', left: 'calc(50% + 380px)' },
      xs: { top: 'calc(50% - 25px)', left: 'calc(50% + 160px)' },
    },
  },
  5: {
    // bottom right
    l: {
      sm: { top: 'calc(50% + 200px)', left: 'calc(50% + 340px)' },
      xs: { top: 'calc(50% + 175px)', left: 'calc(50% + 130px)' },
    },
    r: {
      sm: { top: 'calc(50% + 200px)', left: 'calc(50% + 380px)' },
      xs: { top: 'calc(50% + 175px)', left: 'calc(50% + 160px)' },
    },
  },
};

const shownCardPosition: any = {
  0: {
    // bottom(hero)
    l: {
      sm: { top: 'calc(50% + 100px)', left: 'calc(50% + 100px)' },
      xs: { top: 'calc(50% + 120px)', left: 'calc(50% - 15px)' },
    },
    r: {
      sm: { top: 'calc(50% + 100px)', left: 'calc(50% + 140px)' },
      xs: { top: 'calc(50% + 120px)', left: 'calc(50% + 15px)' },
    },
  },
  1: {
    // bottom left
    l: {
      sm: { top: 'calc(50% + 100px)', left: 'calc(50% - 240px)' },
      xs: { top: 'calc(50% + 100px)', left: 'calc(50% - 90px)' },
    },
    r: {
      sm: { top: 'calc(50% + 100px)', left: 'calc(50% - 200px)' },
      xs: { top: 'calc(50% + 100px)', left: 'calc(50% - 60px)' },
    },
  },
  2: {
    // top left
    l: {
      sm: { top: 'calc(50% - 120px)', left: 'calc(50% - 240px)' },
      xs: { top: 'calc(50% - 80px)', left: 'calc(50% - 90px)' },
    },
    r: {
      sm: { top: 'calc(50% - 120px)', left: 'calc(50% - 200px)' },
      xs: { top: 'calc(50% - 80px)', left: 'calc(50% - 60px)' },
    },
  },
  3: {
    // top
    l: {
      sm: { top: 'calc(50% - 120px)', left: 'calc(50% + 100px)' },
      xs: { top: 'calc(50% - 140px)', left: 'calc(50% - 15px)' },
    },
    r: {
      sm: { top: 'calc(50% - 120px)', left: 'calc(50% + 140px)' },
      xs: { top: 'calc(50% - 140px)', left: 'calc(50% + 15px)' },
    },
  },
  4: {
    // top right
    l: {
      sm: { top: 'calc(50% - 120px)', left: 'calc(50% + 200px)' },
      xs: { top: 'calc(50% - 80px)', left: 'calc(50% + 60px)' },
    },
    r: {
      sm: { top: 'calc(50% - 120px)', left: 'calc(50% + 240px)' },
      xs: { top: 'calc(50% - 80px)', left: 'calc(50% + 90px)' },
    },
  },
  5: {
    // bottom right
    l: {
      sm: { top: 'calc(50% + 100px)', left: 'calc(50% + 200px)' },
      xs: { top: 'calc(50% + 100px)', left: 'calc(50% + 60px)' },
    },
    r: {
      sm: { top: 'calc(50% + 100px)', left: 'calc(50% + 240px)' },
      xs: { top: 'calc(50% + 100px)', left: 'calc(50% + 90px)' },
    },
  },
};

const styles = (theme: any) => {
  const base: any = {
    base: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    dealt0Left: {
      [theme.breakpoints.up('sm')]: { top: cardPosition['0'].l.sm.top, left: cardPosition['0'].l.sm.left },
      [theme.breakpoints.only('xs')]: { top: cardPosition['0'].l.xs.top, left: cardPosition['0'].l.xs.left },
    },
    dealt0Right: {
      [theme.breakpoints.up('sm')]: { top: cardPosition['0'].r.sm.top, left: cardPosition['0'].r.sm.left },
      [theme.breakpoints.only('xs')]: { top: cardPosition['0'].r.xs.top, left: cardPosition['0'].r.xs.left },
    },
    dealt1Left: {
      [theme.breakpoints.up('sm')]: { top: cardPosition['1'].l.sm.top, left: cardPosition['1'].l.sm.left },
      [theme.breakpoints.only('xs')]: { top: cardPosition['1'].l.xs.top, left: cardPosition['1'].l.xs.left },
    },
    dealt1Right: {
      [theme.breakpoints.up('sm')]: { top: cardPosition['1'].r.sm.top, left: cardPosition['1'].r.sm.left },
      [theme.breakpoints.only('xs')]: { top: cardPosition['1'].r.xs.top, left: cardPosition['1'].r.xs.left },
    },
    dealt2Left: {
      [theme.breakpoints.up('sm')]: { top: cardPosition['2'].l.sm.top, left: cardPosition['2'].l.sm.left },
      [theme.breakpoints.only('xs')]: { top: cardPosition['2'].l.xs.top, left: cardPosition['2'].l.xs.left },
    },
    dealt2Right: {
      [theme.breakpoints.up('sm')]: { top: cardPosition['2'].r.sm.top, left: cardPosition['2'].r.sm.left },
      [theme.breakpoints.only('xs')]: { top: cardPosition['2'].r.xs.top, left: cardPosition['2'].r.xs.left },
    },
    dealt3Left: {
      [theme.breakpoints.up('sm')]: { top: cardPosition['3'].l.sm.top, left: cardPosition['3'].l.sm.left },
      [theme.breakpoints.only('xs')]: { top: cardPosition['3'].l.xs.top, left: cardPosition['3'].l.xs.left },
    },
    dealt3Right: {
      [theme.breakpoints.up('sm')]: { top: cardPosition['3'].r.sm.top, left: cardPosition['3'].r.sm.left },
      [theme.breakpoints.only('xs')]: { top: cardPosition['3'].r.xs.top, left: cardPosition['3'].r.xs.left },
    },
    dealt4Left: {
      [theme.breakpoints.up('sm')]: { top: cardPosition['4'].l.sm.top, left: cardPosition['4'].l.sm.left },
      [theme.breakpoints.only('xs')]: { top: cardPosition['4'].l.xs.top, left: cardPosition['4'].l.xs.left },
    },
    dealt4Right: {
      [theme.breakpoints.up('sm')]: { top: cardPosition['4'].r.sm.top, left: cardPosition['4'].r.sm.left },
      [theme.breakpoints.only('xs')]: { top: cardPosition['4'].r.xs.top, left: cardPosition['4'].r.xs.left },
    },
    dealt5Left: {
      [theme.breakpoints.up('sm')]: { top: cardPosition['5'].l.sm.top, left: cardPosition['5'].l.sm.left },
      [theme.breakpoints.only('xs')]: { top: cardPosition['5'].l.xs.top, left: cardPosition['5'].l.xs.left },
    },
    dealt5Right: {
      [theme.breakpoints.up('sm')]: { top: cardPosition['5'].r.sm.top, left: cardPosition['5'].r.sm.left },
      [theme.breakpoints.only('xs')]: { top: cardPosition['5'].r.xs.top, left: cardPosition['5'].r.xs.left },
    },
  };

  [0, 1, 2, 3, 4, 5].forEach(no => {
    // link position animation
    base[`position${no}Left`] = {
      [theme.breakpoints.up('sm')]: { animation: `$deal${no}l 0.6s ${0.0 + 0.1 * no}s forwards` },
      [theme.breakpoints.only('xs')]: { animation: `$deal${no}l-xs 0.6s ${0.0 + 0.1 * no}s forwards` },
    };
    base[`position${no}Right`] = {
      [theme.breakpoints.up('sm')]: { animation: `$deal${no}r 0.6s ${0.6 + 0.1 * no}s forwards` },
      [theme.breakpoints.only('xs')]: { animation: `$deal${no}r-xs 0.6s ${0.6 + 0.1 * no}s forwards` },
    };

    // link show animation
    base[`show${no}Left`] = {
      [theme.breakpoints.up('sm')]: { animation: `$show${no}l 0.6s 0.0s forwards` },
      [theme.breakpoints.only('xs')]: { animation: `$show${no}l-xs 0.6s 0.0s forwards` },
    };
    base[`show${no}Right`] = {
      [theme.breakpoints.up('sm')]: { animation: `$show${no}r 0.6s 0.0s forwards` },
      [theme.breakpoints.only('xs')]: { animation: `$show${no}r-xs 0.6s 0.0s forwards` },
    };

    // link muck animation
    base[`muck${no}Left`] = {
      [theme.breakpoints.up('sm')]: { animation: `$muck${no}l 0.6s 0.0s forwards` },
      [theme.breakpoints.only('xs')]: { animation: `$muck${no}l-xs 0.6s 0.0s forwards` },
    };
    base[`muck${no}Right`] = {
      [theme.breakpoints.up('sm')]: { animation: `$muck${no}r 0.6s 0.0s forwards` },
      [theme.breakpoints.only('xs')]: { animation: `$muck${no}r-xs 0.6s 0.0s forwards` },
    };

    // 定義: deal animation
    base[`@keyframes deal${no}l`] = {
      '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
      '100%': {
        ...cardPosition[no].l.sm,
        transform: 'translate(-50%, -50%) rotateZ(1800deg)',
      },
    };

    base[`@keyframes deal${no}r`] = {
      '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
      '100%': {
        ...cardPosition[no].r.sm,
        transform: 'translate(-50%, -50%) rotateZ(1800deg)',
      },
    };

    base[`@keyframes deal${no}l-xs`] = {
      '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
      '100%': {
        ...cardPosition[no].l.xs,
        transform: 'translate(-50%, -50%) rotateZ(1800deg)',
      },
    };

    base[`@keyframes deal${no}r-xs`] = {
      '0%': { transform: 'translate(-50%, -50%) rotateZ(0deg)' },
      '100%': {
        ...cardPosition[no].r.xs,
        transform: 'translate(-50%, -50%) rotateZ(1800deg)',
      },
    };

    // 定義: show animation
    base[`@keyframes show${no}l`] = {
      '0%': cardPosition[no].l.sm,
      '100%': { ...shownCardPosition[no].l.sm, transform: 'translate(-50%, -50%)' },
    };
    base[`@keyframes show${no}r`] = {
      '0%': cardPosition[no].r.sm,
      '100%': { ...shownCardPosition[no].r.sm, transform: 'translate(-50%, -50%)' },
    };
    base[`@keyframes show${no}l-xs`] = {
      '0%': cardPosition[no].l.xs,
      '100%': { ...shownCardPosition[no].l.xs, transform: 'translate(-50%, -50%)' },
    };
    base[`@keyframes show${no}r-xs`] = {
      '0%': cardPosition[no].r.xs,
      '100%': { ...shownCardPosition[no].r.xs, transform: 'translate(-50%, -50%)' },
    };

    // 定義: muck animation
    base[`@keyframes muck${no}l`] = {
      '0%': cardPosition[no].l.sm,
      '100%': { ...shownCardPosition[no].l.sm, opacity: 0, transform: 'translate(-50%, -50%)' },
    };
    base[`@keyframes muck${no}r`] = {
      '0%': cardPosition[no].r.sm,
      '100%': { ...shownCardPosition[no].r.sm, opacity: 0, transform: 'translate(-50%, -50%)' },
    };
    base[`@keyframes muck${no}l-xs`] = {
      '0%': cardPosition[no].l.xs,
      '100%': { ...shownCardPosition[no].l.xs, opacity: 0, transform: 'translate(-50%, -50%)' },
    };
    base[`@keyframes muck${no}r-xs`] = {
      '0%': cardPosition[no].r.xs,
      '100%': { ...shownCardPosition[no].r.xs, opacity: 0, transform: 'translate(-50%, -50%)' },
    };
  });

  return base;
};

export const useStyles = makeStyles(styles);
