import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
// eslint-disable-next-line import/no-cycle
import createElectronStorage from 'redux-persist-electron-storage';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// eslint-disable-next-line import/no-cycle
import createRootReducer from './rootReducer';
// eslint-disable-next-line import/no-cycle
import { RootState } from './store/utilities';

export const history = createHashHistory();
export const rootReducer = createRootReducer(history);

const router = routerMiddleware(history);
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  router,
];

const excludeLoggerEnvs = ['test', 'production'];
const shouldIncludeLogger = !excludeLoggerEnvs.includes(
  process.env.NODE_ENV || ''
);

if (shouldIncludeLogger) {
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });
  middleware.push(logger);
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage: createElectronStorage(),
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configuredStore = (initialState?: RootState) => {
  // Create Store
  const store = configureStore({
    reducer: persistedReducer,
    middleware,
    preloadedState: initialState,
  });

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept(
      './rootReducer',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('./rootReducer').default)
    );
  }
  return store;
};
