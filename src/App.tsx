import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions, FlatList, Image,
  ImageSourcePropType, Pressable,
  SafeAreaView, StyleSheet, Text,
  ToastAndroid, View,
} from 'react-native';

import { globalStyles } from './styles';
import {
  BASIC, CARD_HEIGHT, CARD_WIDTH,
  COLOUR, COLOUR_BACKGROUND, COLOUR_BORDER,
  COLOUR_TEXT, COUNT, DRAW,
  END, FILL,
  GAME, GAME_SUMMARY, HOW,
  HOW_TO, IMAGE, LANDING,
  MAX_HAND_SIZE, MODE, MODE_BASIC,
  MODE_TIMED, MODE_ZEN,
  NEW_GAME, POINTS,
  RESTART, SHAPE, STANDARD_HAND_SIZE,
  SUMMARY, TIMED, TITLE, TOAST_DECK_TOO_SMALL,
  TOAST_GAME_COMPLETE, TOAST_HAND_TOO_LARGE,
  TOAST_MATCH_FAILURE, TOAST_MATCH_SUCCESS,
  TOAST_MINUS_ONE_POINT, TOAST_PLUS_ONE_POINT,
  TOAST_PLUS_THREE_POINTS, TOAST_THREE_SELECTED_MAX,
  VALUE, ZEN,
  MATCHES_NEEDED,
  secondInterval,
  showKey
} from './constants';
import HowToMenu from './components/HowToMenu';

type Card = [number, number, number, number, number, ImageSourcePropType];
type Deck = Card[];
type Hand = Card[];

type CardAttribute = typeof SHAPE | typeof COUNT | typeof COLOUR | typeof FILL;

const images = [
  require('./images/card00.png'), require('./images/card01.png'), require('./images/card02.png'),
  require('./images/card03.png'), require('./images/card04.png'), require('./images/card05.png'),
  require('./images/card06.png'), require('./images/card07.png'), require('./images/card08.png'),
  require('./images/card09.png'), require('./images/card10.png'), require('./images/card11.png'),
  require('./images/card12.png'), require('./images/card13.png'), require('./images/card14.png'),
  require('./images/card15.png'), require('./images/card16.png'), require('./images/card17.png'),
  require('./images/card18.png'), require('./images/card19.png'), require('./images/card20.png'),
  require('./images/card21.png'), require('./images/card22.png'), require('./images/card23.png'),
  require('./images/card24.png'), require('./images/card25.png'), require('./images/card26.png'),
  require('./images/card27.png'), require('./images/card28.png'), require('./images/card29.png'),
  require('./images/card30.png'), require('./images/card31.png'), require('./images/card32.png'),
  require('./images/card33.png'), require('./images/card34.png'), require('./images/card35.png'),
  require('./images/card36.png'), require('./images/card37.png'), require('./images/card38.png'),
  require('./images/card39.png'), require('./images/card40.png'), require('./images/card41.png'),
  require('./images/card42.png'), require('./images/card43.png'), require('./images/card44.png'),
  require('./images/card45.png'), require('./images/card46.png'), require('./images/card47.png'),
  require('./images/card48.png'), require('./images/card49.png'), require('./images/card50.png'),
  require('./images/card51.png'), require('./images/card52.png'), require('./images/card53.png'),
  require('./images/card54.png'), require('./images/card55.png'), require('./images/card56.png'),
  require('./images/card57.png'), require('./images/card58.png'), require('./images/card59.png'),
  require('./images/card60.png'), require('./images/card61.png'), require('./images/card62.png'),
  require('./images/card63.png'), require('./images/card64.png'), require('./images/card65.png'),
  require('./images/card66.png'), require('./images/card67.png'), require('./images/card68.png'),
  require('./images/card69.png'), require('./images/card70.png'), require('./images/card71.png'),
  require('./images/card72.png'), require('./images/card73.png'), require('./images/card74.png'),
  require('./images/card75.png'), require('./images/card76.png'), require('./images/card77.png'),
  require('./images/card78.png'), require('./images/card79.png'), require('./images/card80.png'),
];

const defaultDeck = [] as Deck;
let cardNumber = 0;
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

const toast = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

const checkCards = (cards: Deck): boolean => {
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

const shuffle = (a: Deck) => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const getNewDeck = (): Deck => {
  return shuffle(defaultDeck.slice());
};

const drawThree = (deck: Deck, hand: Hand) => {
  let drawCount = Math.min(3, deck.length);
  let nextDeck = deck.slice();
  let nextHand = hand.slice();
  while (drawCount !== 0) {
    nextHand.push(nextDeck.pop() as Card);
    --drawCount;
  }
  return [nextDeck, nextHand];
};

const cardKey = (card: Card) => {
  return `${card[SHAPE]}-${card[COUNT]}-${card[COLOUR]}-${card[FILL]}`;
};

const getItemLayout = (_data: Card[] | null | undefined, index: number) => (
  {length: CARD_HEIGHT, offset: CARD_HEIGHT * index, index}
);

export default () => {
  const [view, setView] = useState<number>(LANDING);
  const [deck, setDeck] = useState<Deck>([]);
  const [hand, setHand] = useState<Hand>([]);

  // selected: A list of indicies found in hand.
  const [selected, setSelected] = useState<number[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [gameMode, setGameMode] = useState<number>(MODE_BASIC);

  const timer = useRef<number>();
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer.current as number);
      }
    };
  }, []);

  useEffect(() => {
    if (selected.length === 3) {
      const match = checkCards(
        selected.map(s => hand.find(h => h[VALUE] === s) as Card)
      );
      if (match) {
        if (gameMode === MODE_BASIC) {
          setPoints(points + 3);
          toast(`${TOAST_MATCH_SUCCESS} ${TOAST_PLUS_THREE_POINTS}`);
        }
        else {
          setPoints(points + 1);
          toast(`${TOAST_MATCH_SUCCESS} ${TOAST_PLUS_ONE_POINT}`);
        }

        // Remove the used cards from the hand
        let nextDeck: Deck = deck.slice();
        let nextHand = hand.filter(h => !selected.includes(h[VALUE]));

        // If the hand is less than 9 cards,
        // add up to 9 cards.
        if (deck.length > 0 && nextHand.length < STANDARD_HAND_SIZE) {
          [nextDeck, nextHand] = drawThree(nextDeck, nextHand);
        }

        if (gameMode !== MODE_BASIC) {
          nextDeck.concat(hand.filter(h => selected.includes(h[VALUE])));
        }

        setDeck(nextDeck);
        setHand(nextHand);
      }
      else {
        if (gameMode === MODE_BASIC) {
          setPoints(Math.max(0, points - 1));
          toast(`${TOAST_MATCH_FAILURE} ${TOAST_MINUS_ONE_POINT}`);
        }
      }

      // De-select all three cards.
      setSelected([]);
    }

  // Only run this if selected length changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected.length]);

  useEffect(() => {
    if (checkWin()) {
      toast(TOAST_GAME_COMPLETE);
      showGameSummary();
    }

  // Only run this if points changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  const checkWin = () => {
    return hand.length === 0 || (gameMode === MODE_TIMED && points === MATCHES_NEEDED);
  };

  const chooseMode = () => setView(MODE);

  const getGameStartFunction = () => {
    switch (gameMode) {
      case MODE_BASIC:
        startGameBasic();
        break;
      case MODE_TIMED:
        startGameTimed();
        break;
      case MODE_ZEN:
        startGameZen();
        break;
    }
  };

  // Point based, 81 cards in the deck, 1 deck.
  const startGameBasic = () => startGame(MODE_BASIC);

  // Time based, play until 100 points, cards
  // are reshuffled into the deck after use.
  const startGameTimed = () => startGame(MODE_TIMED);

  // Score based, play forever, cards are
  // reshuffled into the deck after use.
  const startGameZen = () => startGame(MODE_ZEN);

  const startGame = (mode: number = gameMode) => {
    const nextDeck = getNewDeck();
    const nextHand = [
      nextDeck.pop(), nextDeck.pop(), nextDeck.pop(),
      nextDeck.pop(), nextDeck.pop(), nextDeck.pop(),
      nextDeck.pop(), nextDeck.pop(), nextDeck.pop(),
      nextDeck.pop(), nextDeck.pop(), nextDeck.pop(),
    ] as Hand;

    setPoints(0);
    setView(GAME);
    setDeck(nextDeck);
    setHand(nextHand);
    setSelected([]);
    setGameMode(mode);

    if (mode === MODE_TIMED) {
      setTime(0);
      timer.current = setInterval(() => setTime(t => t + 1), secondInterval);
    }
  };

  const toLanding = () => {
    setDeck([]);
    setView(LANDING);
  };

  const draw = () => {
    if (deck.length === 0) {
      toast(TOAST_DECK_TOO_SMALL);
      return;
    }

    if (hand.length >= MAX_HAND_SIZE) {
      toast(TOAST_HAND_TOO_LARGE);
      return;
    }

    const [nextDeck, nextHand] = drawThree(deck, hand);
    setDeck(nextDeck);
    setHand(nextHand);
    setSelected([]);
  };

  const selectCard = (cardValue: number) => {
    let nextSelected = selected.slice();
    if (nextSelected.includes(cardValue)) {
      nextSelected = nextSelected.filter(s => s !== cardValue);
    }
    else if (selected.length === 3) {
      toast(TOAST_THREE_SELECTED_MAX);
      return;
    }
    else {
      nextSelected.push(cardValue);
    }

    setSelected(nextSelected);
  };

  const toggleHowTo = () => setView(HOW);

  const showGameSummary = () => {
    setView(SUMMARY);

    if (gameMode === MODE_TIMED) {
      clearInterval(timer.current as number);
    }
  };

  const renderCard = ({ item }: { item: Card }) => {
    const isSelected = selected.includes(item[VALUE]);
    const fontWeight = isSelected ? 'bold' : 'normal';
    const backgroundColor = isSelected ? '#EEEEEE' : undefined;
    const selectedOutline = isSelected ? { borderWidth: 1, borderColor: '#AA0000' } : null;
    return (
      <Pressable style={[styles.card, { backgroundColor }, selectedOutline ]}
        onPress={() => selectCard(item[VALUE])}>
        {showKey
        ? <Text style={{ fontWeight }}>{cardKey(item)}</Text>
        : <Image source={item[IMAGE]}
            style={globalStyles.cardImage} />
        }
      </Pressable>
    );
  };

  const renderVertcalCardGap = () => <View style={styles.verticalCardGap} />;

  const renderCards = () => (
    <FlatList
      data={hand}
      numColumns={3}
      style={styles.cards}
      renderItem={renderCard}
      keyExtractor={cardKey}
      columnWrapperStyle={styles.cardColumn}
      ItemSeparatorComponent={renderVertcalCardGap}
      getItemLayout={getItemLayout}
    />
  );

  const renderMode = () => (
    <SafeAreaView style={styles.landing}>
      <View style={styles.landingButtons}>
        <Pressable onPress={startGameBasic}>
          <Text style={styles.landingButton}>{BASIC}</Text>
        </Pressable>
        <Pressable onPress={startGameTimed}>
          <Text style={styles.landingButton}>{TIMED}</Text>
        </Pressable>
        <Pressable onPress={startGameZen}>
          <Text style={styles.landingButton}>{ZEN}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );

  const renderSummary = () => (
    <View style={globalStyles.wrapper}>
      <View style={globalStyles.header}>
        <Text style={styles.gameTitle}>{GAME_SUMMARY}</Text>
      </View>
      <View style={globalStyles.content}>
        {gameMode === MODE_TIMED
        ? <Text style={globalStyles.buttonText}>{points} matches in {time} seconds</Text>
        : <Text style={globalStyles.buttonText}>Final Score: {points} / 81</Text>}
      </View>
      <View style={globalStyles.footer}>
        <Pressable style={[styles.gameButton, styles.gameButtonLeft]} onPress={toLanding}>
          <Text style={globalStyles.buttonText}>Menu</Text>
        </Pressable>
        <Pressable style={styles.gameButton} onPress={getGameStartFunction}>
          <Text style={globalStyles.buttonText}>Again</Text>
        </Pressable>
        <Pressable style={[styles.gameButton, styles.gameButtonRight]} onPress={chooseMode}>
          <Text style={globalStyles.buttonText}>New</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderGame = () => (
    <SafeAreaView style={globalStyles.wrapper}>
      <View style={globalStyles.header}>
        <Text style={[globalStyles.buttonText, styles.gameButton, styles.gameButtonLeft]}>{TITLE}</Text>
        <Text style={styles.gameTitle}>{
          gameMode === MODE_TIMED ? TIMED :
          gameMode === MODE_ZEN ? ZEN :
          BASIC
        }</Text>
        <Pressable style={[styles.gameButton, styles.gameButtonRight]} onPress={getGameStartFunction}>
          <Text style={globalStyles.buttonText}>{RESTART}</Text>
        </Pressable>
      </View>
      {renderCards()}
      <View style={globalStyles.footer}>
        <Pressable style={[styles.gameButton, styles.gameButtonLeft]} onPress={showGameSummary}>
          <Text style={globalStyles.buttonText}>{END}</Text>
        </Pressable>
        <Text style={styles.points}>
          {gameMode === MODE_TIMED ? time
          : `${POINTS}: ${points}`}
        </Text>
        <Pressable style={[styles.gameButton, styles.gameButtonRight]} onPress={draw}>
          <Text style={globalStyles.buttonText}>{DRAW}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );

  const renderLanding = () => (
    <SafeAreaView style={styles.landing}>
      <View><Text style={styles.title}>{TITLE}</Text></View>
      <View style={styles.landingButtons}>
        <Pressable onPress={chooseMode}>
          <Text style={styles.landingButton}>{NEW_GAME}</Text>
        </Pressable>
        <Pressable onPress={toggleHowTo}>
          <Text style={styles.landingButton}>{HOW_TO}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );

  const getViewComponent = () => {
    switch (view) {
      case MODE:
        return renderMode();
      case SUMMARY:
        return renderSummary();
      case HOW:
        return <HowToMenu images={images} toLanding={toLanding} />;
      case GAME:
        return renderGame();
      case LANDING:
      default:
        return renderLanding();
    }
  };

  return getViewComponent();
};

const styles = StyleSheet.create({

  // LANDING

  landing: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: COLOUR_BACKGROUND,
  },
  title: {
    fontSize: 72,
    color: COLOUR_TEXT,
  },
  landingButtons: {
    width: '80%',
    gap: 40,
  },
  landingButton: {
    width: '100%',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: COLOUR_BORDER,
    paddingVertical: 10,
    paddingHorizontal: 25,
    fontSize: 32,
    color: COLOUR_TEXT,
    textAlign: 'center',
  },

  // GAME

  gameButton: {
    width: '30%',
    paddingVertical: 5,
    borderColor: COLOUR_BORDER,
  },
  gameButtonLeft: {
    borderRightWidth: 1,
  },
  gameButtonRight: {
    borderLeftWidth: 1,
  },
  gameTitle: {
    flex: 1,
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    paddingVertical: 5,
  },
  cards: {
    flex: 1,
  },
  cardColumn: {
    justifyContent: 'space-around',
  },
  card: {
    height: CARD_HEIGHT + 8,
    width: CARD_WIDTH + 8,
    padding: 3,
    borderWidth: 1,
    borderColor: COLOUR_BORDER,
    borderRadius: 5,
  },
  points: {
    flex: 1,
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 5,
    color: COLOUR_TEXT,
  },
  verticalCardGap: {
    height: 5,
  },
});
