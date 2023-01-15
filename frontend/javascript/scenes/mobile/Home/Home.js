import React from 'react';

import useStyles from './HomeStyles';

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.base}>
      <div className={classes.container}>Hello Poker</div>
    </div>
  );
};

export default Home;
