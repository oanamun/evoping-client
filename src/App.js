import React from 'react';
import { BrowserRouter, Match } from 'react-router';
import { Provider } from 'react-redux';
import store from 'store/store';
import 'assets/styles/styles.scss';
import MainContainer from 'modules/main';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Match
          pattern="/"
          component={MainContainer}
        />
      </BrowserRouter>
    </Provider>
  );
}
