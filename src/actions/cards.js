import { SHOW_CARD, CLEAR_FLIPPED_CARDS } from '../types';

export const showCard = (card) => {
  return {
    type: SHOW_CARD,
    payload: card
  };
};

export const clearFlippedCards = () => {
  return {
    type: CLEAR_FLIPPED_CARDS
  };
};