import { ImageSourcePropType } from "react-native";
import { Card, CardAttribute } from "../types";
import { SHAPE, COUNT, COLOUR, FILL } from "../constants";

export const generateDeck = (images: ImageSourcePropType[]): Card[] => {
  let cardNumber = 0;
  const defaultDeck = [] as Card[];
  for (let shape = 0; shape < 3; shape++) {
    for (let count = 0; count < 3; count++) {
      for (let colour = 0; colour < 3; colour++) {
        for (let fill = 0; fill < 3; fill++) {
          defaultDeck.push([
            cardNumber, shape, count, colour, fill, images[cardNumber],
          ]);
          ++cardNumber;
        }
      }
    }
  }
  return defaultDeck;
};

export const checkCards = (cards: Card[]): boolean => {
  if (cards.length !== 3) {
    return false;
  }

  let match = 0;
  const card1 = cards[0];
  const card2 = cards[1];
  const card3 = cards[2];

  match += compareElement(card1, card2, card3, SHAPE);
  match += compareElement(card1, card2, card3, COUNT);
  match += compareElement(card1, card2, card3, COLOUR);
  match += compareElement(card1, card2, card3, FILL);

  return match === 4;
};

const compareElement = (card1: Card, card2: Card, card3: Card, element: CardAttribute) => {
  const e1 = card1[element];
  const e2 = card2[element];
  const e3 = card3[element];
  if ((e1 === e2 && e2 === e3) || (e1 !== e2 && e1 !== e3 && e2 !== e3)) {
      return 1;
  }
  return 0;
};

export const shuffle = (a: Card[]) => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const getNewDeck = (images: ImageSourcePropType[]): Card[] => {
  return shuffle(generateDeck(images));
};

export const drawThree = (deck: Card[], hand: Card[]) => {
  let drawCount = Math.min(3, deck.length);
  let nextDeck = deck.slice();
  let nextHand = hand.slice();
  while (drawCount !== 0) {
    nextHand.push(nextDeck.pop() as Card);
    --drawCount;
  }
  return [nextDeck, nextHand];
};

export const cardKey = (card: Card) => {
  return `${card[SHAPE]}-${card[COUNT]}-${card[COLOUR]}-${card[FILL]}`;
};
