import { ImageSourcePropType } from 'react-native';
import { SHAPE, COUNT, COLOUR, FILL } from './constants';

export type Card = [number, number, number, number, number, ImageSourcePropType];

export type CardAttribute = typeof SHAPE | typeof COUNT | typeof COLOUR | typeof FILL;

export type Match = { match: Card[], success: boolean };
