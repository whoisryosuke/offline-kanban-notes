import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
// @see: https://stackoverflow.com/a/63924400
// eslint-disable-next-line
import { configuredStore, rootReducer } from '../store';

export type RootState = ReturnType<typeof rootReducer>;

export type Store = ReturnType<typeof configuredStore>;
export type AppDispatch = Store['dispatch'];
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
