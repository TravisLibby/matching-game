import { combineReducers } from 'redux';
import cards from './cards';
import matches from './matches';
import turns from './turns';

export default combineReducers({cards, matches, turns});