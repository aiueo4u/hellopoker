import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './reducer';
import rootSaga from './sagas';

const loggerMiddleware = createLogger({
  duration: true,
  collapsed: true,
});

export default function configureStore(preloadedState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, preloadedState, applyMiddleware(sagaMiddleware, loggerMiddleware));
  sagaMiddleware.run(rootSaga);
  return store;
}
