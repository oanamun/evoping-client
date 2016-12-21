import { applyMiddleware, createStore, compose } from 'redux';

import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from 'reducers/reducers';

const middlewaresUsed = [thunk];
let devTools = null;

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    collapsed: true,
  });

  middlewaresUsed.push(logger);

  // TODO add Redux DevTools extension
  if (window.devToolsExtension) {
    devTools = window.devToolsExtension()
  }
}

const middleware = applyMiddleware(...middlewaresUsed);

const composeMiddleware = devTools ? compose(middleware, devTools) : compose(middleware);
export default composeMiddleware(createStore)(reducer);
