import { SET_ALL_CARDS } from '../types';

const initialState = {
  listItems: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_CARDS:
      return { ...state, listItems: action.payload };
    default:
      return state;
  }
};
