import { TURN_TAKEN, CLEAR_TURNS } from '../types';

function turns (state = 0, action) {
  switch (action.type) {
    case TURN_TAKEN :
      return state + 1;
    case CLEAR_TURNS :
      return 0;
    default :
      return state;
  }
}

export default turns;