import { SET_ALL_CARDS } from '../types';

export const setAllCards = (array) => ({
  type: SET_ALL_CARDS,
  payload: array,
});
