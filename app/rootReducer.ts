/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import counterReducer from './features/counter/counterSlice';
import boards from './models/boards';
import cards from './models/cards';
import columns from './models/columns';
/* eslint-enable import/no-cycle */

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
    boards,
    columns,
    cards,
  });
}
