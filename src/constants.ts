import { Dimensions } from 'react-native';

export const showKey = false;

export const LANDING = 0;
export const MODE = 1;
export const GAME = 2;
export const SUMMARY = 3;
export const HOW = 4;

export const MODE_BASIC = 0;
export const MODE_TIMED = 1;
export const MODE_ZEN = 2;

export const NONE = 0;
export const GAME_MODES = 1;
export const MATCHES = 2;

export const VALUE = 0;
export const SHAPE = 1;
export const COUNT = 2;
export const COLOUR = 3;
export const FILL = 4;
export const IMAGE = 5;

export const STANDARD_HAND_SIZE = 12;
export const MAX_HAND_SIZE = 18;

export const COLOR_BLACK = 'black';
export const COLOUR_TEXT = '#222222';
export const COLOUR_BORDER = '#DDDDDD';
export const COLOUR_BACKGROUND = '#EEEEEE';
export const COLOUR_BACKGROUND_CONTRAST = '#FFFFFF';

export const CARD_HEIGHT = Dimensions.get('screen').height / 9;
export const CARD_WIDTH = CARD_HEIGHT * 0.63;

export const secondInterval = 1000;
export const MATCHES_NEEDED = 10;

// Strings
export const TITLE = 'Trois';
export const NEW_GAME = 'New Game';
export const HOW_TO = 'How to Play';
export const RESTART = 'Restart';
export const END = 'End';
export const POINTS = 'Points';
export const DRAW = 'Draw';
export const GAME_SUMMARY = 'Game Summary';
export const BASIC = 'Basic';
export const TIMED = 'Timed';
export const ZEN = 'Zen';

export const TOAST_HAND_TOO_LARGE = `Max hand size of ${MAX_HAND_SIZE}!`;
export const TOAST_DECK_TOO_SMALL = 'No cards left in deck!';
export const TOAST_THREE_SELECTED_MAX = 'Maximum 3 selected cards!';
export const TOAST_MATCH_SUCCESS = 'Match found!';
export const TOAST_PLUS_THREE_POINTS = '+3 points';
export const TOAST_PLUS_ONE_POINT = '+1 point';
export const TOAST_MINUS_ONE_POINT = '-1 point';
export const TOAST_MATCH_FAILURE = 'No match!';
export const TOAST_GAME_COMPLETE = 'Game over!';