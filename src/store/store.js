import { applyMiddleware, createStore, compose } from 'redux';

import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from 'reducers/reducers';

const middlewaresUsed = [thunk];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    collapsed: true,
  });

  middlewaresUsed.push(logger);

  // TODO add Redux DevTools extension
  if (window.devToolsExtension) {
    // middlewaresUsed.push(window.devToolsExtension());
  }
}

const middleware = applyMiddleware(...middlewaresUsed);

export default compose(middleware)(createStore)(reducer);
