import React from 'react';
import useStyles from './HomeStyles';

const Home = () => {
  const classes = useStyles();

  return <div className={classes.container}>Hello, Poker!</div>;
};

export default Home;
