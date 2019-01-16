import { MATCH_FOUND, CLEAR_MATCHES } from '../types';

function matches (state = [], action) {
  switch(action.type) {
    case MATCH_FOUND :
      return [
        ...state,
        action.payload
      ];
    case CLEAR_MATCHES :
      return [];
    default :
      return state;
  }
}

export default matches;