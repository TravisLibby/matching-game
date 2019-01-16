import { SHOW_CARD, MATCH_FOUND, CLEAR_FLIPPED_CARDS } from '../types';

function cards (state = [], action) {
  switch (action.type) {
    case SHOW_CARD :
      return [
        ...state,
        action.payload
      ];
    case MATCH_FOUND :
      return [];
    case CLEAR_FLIPPED_CARDS :
      return [];
    default :
      return state;
  }
}

export default cards;