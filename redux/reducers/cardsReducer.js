import { ADD_CARD_TO_STORE } from '../types';
import { DELETE_FROM_CART } from '../types';

const initialState = {
  cards: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD_TO_STORE:
      return { ...state, cards: [...state.cards, action.payload] };
    case DELETE_FROM_CART:
      return { ...state, cards: action.payload };
    default:
      return state;
  }
};
