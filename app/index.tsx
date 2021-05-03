import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import persistStore from 'redux-persist/es/persistStore';
import { history, configuredStore } from './store';
import './app.global.css';

const store = configuredStore();
const persistor = persistStore(store);

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line global-require
  const Root = require('./containers/Root').default;
  render(
    <AppContainer>
      <Root store={store} persistor={persistor} history={history} />
    </AppContainer>,
    document.getElementById('root')
  );
});
