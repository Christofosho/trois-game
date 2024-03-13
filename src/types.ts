import { ImageSourcePropType } from "react-native";
import { SHAPE, COUNT, COLOUR, FILL } from "./constants";

export type Card = [
  number, // value
  number, // shape
  number, // count
  number, // colour
  number, // fill
  ImageSourcePropType
];

export type CardAttribute = typeof SHAPE | typeof COUNT | typeof COLOUR | typeof FILL;

export type Match = { match: Card[], success: boolean };

type Game = {
  matches: number;
  draws: number;
  fails: number;
  cards: number[][]
};

export type Statistics = {
  games: number;
  wins: number;
  draws: number;
  fails: number;
  last: Game | null;
};
