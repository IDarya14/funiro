import { combineReducers } from 'redux';
import cardsReducer from './cardsReducer';
import listItemsReducer from './listItemsReducer';

export const rootReducer = combineReducers({
  cardsReducer,
  listItemsReducer,
});
