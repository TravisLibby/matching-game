import { MATCH_FOUND, CLEAR_MATCHES } from '../types';

export const matchFound = (type) => {
  return {
    type: MATCH_FOUND,
    payload: type
  };
};

export const clearMatches = () => {
  return {
    type: CLEAR_MATCHES
  };
};