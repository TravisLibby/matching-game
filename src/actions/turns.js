import { TURN_TAKEN, CLEAR_TURNS } from '../types';

export const turnTaken = () => {
  return {
    type: TURN_TAKEN
  };
};

export const clearTurns = () => {
  return {
    type: CLEAR_TURNS
  };
};