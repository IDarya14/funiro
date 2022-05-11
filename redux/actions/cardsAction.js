import { ADD_CARD_TO_STORE } from '../types';
import { DELETE_FROM_CART } from '../types';

export const addCardstoCart = (card) => ({
  type: ADD_CARD_TO_STORE,
  payload: card,
});

export const deleteFromCart = (array) => ({
  type: DELETE_FROM_CART,
  payload: array,
});
