import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions, FlatList, Image,
  ImageSourcePropType, Pressable,
  SafeAreaView, ScrollView, StyleSheet, Text,
  ToastAndroid, View,
} from 'react-native';

const showKey = false;

const LANDING = 0;
const MODE = 1;
const GAME = 2;
const SUMMARY = 3;
const HOW = 4;

const MODE_BASIC = 0;
const MODE_TIMED = 1;
const MODE_ZEN = 2;

const NONE = 0;
const GAME_MODES = 1;
const MATCHES = 2;

const VALUE = 0;
const SHAPE = 1;
const COUNT = 2;
const COLOUR = 3;
const FILL = 4;
const IMAGE = 5;

const STANDARD_HAND_SIZE = 12;
const MAX_HAND_SIZE = 18;

const COLOUR_TEXT = '#222222';
const COLOUR_BORDER = '#DDDDDD';
const COLOUR_BACKGROUND = '#FFFFFF';

const CARD_HEIGHT = 76;
const CARD_WIDTH = 48;

const secondInterval = 1000;
const matchesNeeded = 10;

// Strings
const TITLE = 'Trois';
const NEW_GAME = 'New Game';
const HOW_TO = 'How to Play';
const RESTART = 'Restart';
const END = 'End';
const POINTS = 'Points';
const DRAW = 'Draw';
const GAME_SUMMARY = 'Game Summary';
const BASIC = 'Basic';
const TIMED = 'Timed';
const ZEN = 'Zen';

const TOAST_HAND_TOO_LARGE = `Max hand size of ${MAX_HAND_SIZE}!`;
const TOAST_DECK_TOO_SMALL = 'No cards left in deck!';
const TOAST_THREE_SELECTED_MAX = 'Maximum 3 selected cards!';
const TOAST_MATCH_SUCCESS = 'Match found!';
const TOAST_PLUS_THREE_POINTS = '+3 points';
const TOAST_PLUS_ONE_POINT = '+1 point';
const TOAST_MINUS_ONE_POINT = '-1 point';
const TOAST_MATCH_FAILURE = 'No match!';
const TOAST_GAME_COMPLETE = 'Game over!';

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
  const [howToVisible, setHowToVisible] = useState<number>(NONE);

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
        let nextHand = hand.filter(h => !selected.includes(h[VALUE]));

        // TODO: If not MODE_BASIC shuffle selected back into hand.

        // If the hand is less than 9 cards,
        // add up to 9 cards.
        if (deck.length > 0 && nextHand.length < STANDARD_HAND_SIZE) {
          let nextDeck: Deck;
          [nextDeck, nextHand] = drawThree(deck, nextHand);
          setDeck(nextDeck);
        }

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
    return hand.length === 0 || (gameMode === MODE_TIMED && points === matchesNeeded);
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
  const toggleGameModes = () => (
    setHowToVisible(howToVisible === GAME_MODES ? NONE : GAME_MODES)
  );
  const toggleMatches = () => (
    setHowToVisible(howToVisible === MATCHES ? NONE : MATCHES)
  );

  const renderHowTo = () => {
    const showHowToGameModes = howToVisible === GAME_MODES ? 'flex' : 'none';
    const showHowToMatches = howToVisible === MATCHES ? 'flex' : 'none';
    return (
      <View style={styles.game}>
        <View style={styles.header}>
          <Text style={styles.howToTitle}>{HOW_TO}</Text>
          <Pressable
            style={styles.closeButton}
            onPress={toLanding}>
            <Text style={styles.closeButtonText}>x</Text>
          </Pressable>
        </View>
        <ScrollView style={styles.content}>
          <Text style={styles.howToContentText}>
            Trois is the French word for "three".
          </Text>
          <Text style={styles.howToContentText}>
            In the game of Trois, there are many groups of three.
            There are three different shapes, which come in three different counts,
            and can have three different fillings, and three different colours.
          </Text>
          <Pressable style={styles.howToToggle} onPress={toggleGameModes}>
            <Text style={[styles.buttonText, styles.toggleButtonText]}>Game Modes</Text>
            <Text style={styles.buttonText}>{howToVisible === GAME_MODES ? '-' : '+'}</Text>
          </Pressable>
          <View style={{ display: showHowToGameModes }}>
            <Text style={styles.howToContentText}>
              There are three game modes in Trois:
            </Text>
            <Text style={styles.howToContentListItem}>
              <Text style={styles.underline}>Basic Mode</Text>:
              Try to hit 81 points, gain 3 points for a match,
              lose 1 point for a mistake, 81 unique cards.
            </Text>
            <Text style={styles.howToContentListItem}>
              <Text style={styles.underline}>Timed Mode</Text>:
              Work toward {matchesNeeded} matches in as little time as possible.
              Used cards reshuffle into the deck.
            </Text>
            <Text style={styles.howToContentListItem}>
              <Text style={styles.underline}>Zen Mode</Text>:
              Play forever, with no loss of points.
              Used cards will reshuffle into the deck.
            </Text>
          </View>
          <Pressable style={styles.howToToggle} onPress={toggleMatches}>
            <Text style={[styles.buttonText, styles.toggleButtonText]}>
              Finding a Match
            </Text>
            <Text style={styles.buttonText}>{howToVisible === MATCHES ? '-' : '+'}</Text>
          </Pressable>
          <View style={{ display: showHowToMatches }}>
            <Text style={styles.howToContentText}>
              To score points, you must choose three cards that, for each of the 4
              characteristics (shape, colour, count, fill), are either entirely
              distinct, or all the exact same. If two cards have a matching
              characteristic, and the third does not, it will not be counted as
              a match under the game rules.
            </Text>
            <Text style={styles.howToContentText}>
              Match conditions include each of the following:
            </Text>
            <Text style={styles.howToContentListItem}>
              All but one feature of the cards are matching.
            </Text>
            <Text style={styles.howToContentListSubItem}>
              Example 1: colour, count and fill match, but shape does not; or
            </Text>
            <View style={styles.cardRow}>
              <Image source={images[0]} style={styles.cardImage} />
              <Image source={images[1]} style={styles.cardImage} />
              <Image source={images[2]} style={styles.cardImage} />
            </View>
            <Text style={styles.howToContentListSubItem}>
              Example 2: fill, shape and count match, but colour does not.
            </Text>
            <View style={styles.cardRow}>
              <Image source={images[2]} style={styles.cardImage} />
              <Image source={images[5]} style={styles.cardImage} />
              <Image source={images[8]} style={styles.cardImage} />
            </View>
            <Text style={styles.howToContentListItem}>
              Two features of the cards are matching, and two features are entirely distinct.
            </Text>
            <Text style={styles.howToContentListSubItem}>
              Example 1: shape and count match, but fill and colour do not; or
            </Text>
            <View style={styles.cardRow}>
              <Image source={images[13]} style={styles.cardImage} />
              <Image source={images[37]} style={styles.cardImage} />
              <Image source={images[70]} style={styles.cardImage} />
            </View>
            <Text style={styles.howToContentListSubItem}>
              Example 2: colour and shape match, but count and fill do not.
            </Text>
            <View style={styles.cardRow}>
              <Image source={images[76]} style={styles.cardImage} />
              <Image source={images[13]} style={styles.cardImage} />
              <Image source={images[31]} style={styles.cardImage} />
            </View>
            <Text style={styles.howToContentListItem}>
              Three of the four features of the cards are matching, and one feature does not.
            </Text>
            <Text style={styles.howToContentListSubItem}>
              Example 1: shape matches, but count, fill and colour do not; or
            </Text>
            <View style={styles.cardRow}>
              <Image source={images[6]} style={styles.cardImage} />
              <Image source={images[39]} style={styles.cardImage} />
              <Image source={images[72]} style={styles.cardImage} />
            </View>
            <Text style={styles.howToContentListSubItem}>
              Example 2: colour matches, but shape, count and fill do not.
            </Text>
            <View style={styles.cardRow}>
              <Image source={images[58]} style={styles.cardImage} />
              <Image source={images[50]} style={styles.cardImage} />
              <Image source={images[12]} style={styles.cardImage} />
            </View>
            <Text style={styles.howToContentListItem}>
              None of the features of the cards are matching.
            </Text>
            <Text style={styles.howToContentListSubItem}>
              Example: shape, count, fill and colour are all different.
            </Text>
            <View style={styles.cardRow}>
              <Image source={images[1]} style={styles.cardImage} />
              <Image source={images[41]} style={styles.cardImage} />
              <Image source={images[78]} style={styles.cardImage} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Text>Copyright &copy; Christopher (Christofosho) Snow</Text>
        </View>
      </View>
    );
  };

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
            style={styles.cardImage} />
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
    <View style={styles.game}>
      <View style={styles.header}>
        <Text style={styles.gameTitle}>{GAME_SUMMARY}</Text>
      </View>
      <View style={styles.content}>
        {gameMode === MODE_TIMED
        ? <Text style={styles.buttonText}>{points} matches in {time} seconds</Text>
        : <Text style={styles.buttonText}>Final Score: {points} / 81</Text>}
      </View>
      <View style={styles.footer}>
        <Pressable style={[styles.gameButton, styles.gameButtonLeft]} onPress={toLanding}>
          <Text style={styles.buttonText}>Menu</Text>
        </Pressable>
        <Pressable style={styles.gameButton} onPress={getGameStartFunction}>
          <Text style={styles.buttonText}>Again</Text>
        </Pressable>
        <Pressable style={[styles.gameButton, styles.gameButtonRight]} onPress={chooseMode}>
          <Text style={styles.buttonText}>New</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderGame = () => (
    <SafeAreaView style={styles.game}>
      <View style={styles.header}>
        <Text style={[styles.buttonText, styles.gameButton, styles.gameButtonLeft]}>{TITLE}</Text>
        <Text style={styles.gameTitle}>{
          gameMode === MODE_TIMED ? TIMED :
          gameMode === MODE_ZEN ? ZEN :
          BASIC
        }</Text>
        <Pressable style={[styles.gameButton, styles.gameButtonRight]} onPress={getGameStartFunction}>
          <Text style={styles.buttonText}>{RESTART}</Text>
        </Pressable>
      </View>
      {renderCards()}
      <View style={styles.footer}>
        <Pressable style={[styles.gameButton, styles.gameButtonLeft]} onPress={showGameSummary}>
          <Text style={styles.buttonText}>{END}</Text>
        </Pressable>
        <Text style={styles.points}>
          {gameMode === MODE_TIMED ? time
          : `${POINTS}: ${points}`}
        </Text>
        <Pressable style={[styles.gameButton, styles.gameButtonRight]} onPress={draw}>
          <Text style={styles.buttonText}>{DRAW}</Text>
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
        return renderHowTo();
      case GAME:
        return renderGame();
      case LANDING:
      default:
        return renderLanding();
    }
  };

  return (
    <>
      {getViewComponent()}
    </>
  );
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

  game: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: COLOUR_BACKGROUND,
  },
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
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOUR_BORDER,
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
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  card: {
    height: CARD_HEIGHT + 8,
    width: CARD_WIDTH + 8,
    padding: 3,
    borderWidth: 1,
    borderColor: COLOUR_BORDER,
    borderRadius: 5,
  },
  cardImage: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    resizeMode: 'cover',
  },
  footer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 5,
    borderTopWidth: 1,
    borderTopColor: COLOUR_BORDER,
  },
  points: {
    flex: 1,
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 5,
    color: COLOUR_TEXT,
  },
  buttonText: {
    fontSize: 24,
    textAlign: 'center',
    color: COLOUR_TEXT,
  },
  toggleButtonText: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  verticalCardGap: {
    height: 5,
  },
  closeButtonText: {
    fontSize: 28,
    color: COLOUR_TEXT,
  },
  content: {
    flex: 1,
    marginHorizontal: 10,
  },
  howToTitle: {
    flex: 1,
    fontSize: 32,
    color: COLOUR_TEXT,
    marginLeft: 20,
  },
  closeButton: {
    marginRight: 20,
  },
  howToContentText: {
    fontSize: 20,
    color: COLOUR_TEXT,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  howToContentListItem: {
    fontSize: 18,
    color: COLOUR_TEXT,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  howToContentListSubItem: {
    fontSize: 16,
    color: COLOUR_TEXT,
    marginHorizontal: 10,
    marginBottom: 5,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: COLOUR_BORDER,
  },
  howToToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLOUR_BORDER,
    paddingTop: 25,
    marginTop: 10,
    marginHorizontal: 10,
  },

  underline: {
    textDecorationLine: 'underline',
  },
});
