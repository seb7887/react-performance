import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { rootReducer } from './reducers';

const loggerMiddleware = createLogger({
  collapsed: true,
  duration: true
});

export const configureStore = (initialState?: {}) => {
  const middlewares = [];
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMiddleware);
  }
  const enhancer = compose(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, initialState, enhancer);
  return store;
};
