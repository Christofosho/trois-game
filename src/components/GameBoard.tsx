import React, { useEffect, useRef, useState } from 'react';
import {
  ImageSourcePropType,
  Pressable,
  SafeAreaView, StyleSheet, Text,
  ToastAndroid, View,
} from 'react-native';

import { globalStyles } from '../styles';
import { Card, Match } from '../types';

import {
  BASIC, COLOUR_TEXT, DRAW, END, MAX_HAND_SIZE,
  MODE_BASIC, MODE_TIMED, MODE_ZEN,
  POINTS, RESTART, STANDARD_HAND_SIZE,
  SUMMARY, TIMED, TITLE, TOAST_DECK_TOO_SMALL,
  TOAST_GAME_COMPLETE, TOAST_HAND_TOO_LARGE,
  TOAST_MATCH_FAILURE, TOAST_MATCH_SUCCESS,
  TOAST_MINUS_ONE_POINT, TOAST_PLUS_ONE_POINT,
  TOAST_PLUS_THREE_POINTS, TOAST_THREE_SELECTED_MAX,
  VALUE, ZEN, MATCHES_NEEDED, secondInterval,
} from '../constants';

import { checkCards, drawThree, getNewDeck, shuffle } from '../utils/deck';
import Cards from '../components/Cards';

const toast = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

interface IGameBoardProps {
  gameMode: number,
  images: ImageSourcePropType[],
  points: number,
  time: number,
  addSelection: (_match: Match) => void,
  setDraws: (_draws: (_t: number) => number) => void,
  setPoints: (_points: number) => void,
  setTime: (_time: (_t: number) => number) => void,
  setView: (_view: number) => void,
  startGame: () => void,
}

export default ({
  gameMode,
  images,
  points,
  time,
  addSelection,
  setDraws,
  setPoints,
  setTime,
  setView,
  startGame,
}: IGameBoardProps) => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [hand, setHand] = useState<Card[]>([]);

  // selected: A list of indicies found in hand.
  const [selected, setSelected] = useState<number[]>([]);

  const timer = useRef<number>();

  useEffect(() => {
    getHandAndDeck();
    tryStartTimer();
    return () => {
      if (timer) {
        clearInterval(timer.current as number);
      }
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selected.length === 3) {
      const selectedCards = selected.map(s => hand.find(h => h[VALUE] === s) as Card);
      const match = checkCards(selectedCards);

      addSelection({
        match: selectedCards,
        success: match,
      });

      if (match) {
        let nextPoints = points;
        if (gameMode === MODE_BASIC) {
          nextPoints += 3;
          toast(`${TOAST_MATCH_SUCCESS} ${TOAST_PLUS_THREE_POINTS}`);
        }
        else {
          nextPoints += 1;
          toast(`${TOAST_MATCH_SUCCESS} ${TOAST_PLUS_ONE_POINT}`);
        }

        setPoints(nextPoints);
        if (checkWin(nextPoints)) {
          toast(TOAST_GAME_COMPLETE);
          showGameSummary();
          return;
        }

        // Remove the used cards from the hand
        let nextDeck: Card[] = deck.slice();
        let nextHand = hand.filter(h => !selected.includes(h[VALUE]));

        // If the hand is less than 9 cards,
        // add up to 9 cards.
        if (deck.length > 0 && nextHand.length < STANDARD_HAND_SIZE) {
          [nextDeck, nextHand] = drawThree(nextDeck, nextHand);
        }

        // In timed and zen mode, add the used cards back into the deck.
        if (gameMode !== MODE_BASIC) {
          nextDeck = [
            ...nextDeck,
            ...hand.filter(h => selected.includes(h[VALUE])),
          ];
        }

        setDeck(shuffle(nextDeck));
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

  const getHandAndDeck = () => {
    const nextDeck = getNewDeck(images);
    const nextHand = [
      nextDeck.pop(), nextDeck.pop(), nextDeck.pop(),
      nextDeck.pop(), nextDeck.pop(), nextDeck.pop(),
      nextDeck.pop(), nextDeck.pop(), nextDeck.pop(),
      nextDeck.pop(), nextDeck.pop(), nextDeck.pop(),
    ] as Card[];

    setDeck(nextDeck);
    setHand(nextHand);
  };

  const restartGame = () => {
    getHandAndDeck();
    setSelected([]);

    tryStartTimer();

    startGame();
  };

  const tryStartTimer = () => {
    if (timer){
      clearInterval(timer.current as number);
    }
    if (gameMode === MODE_TIMED) {
      setTime(_t => 0);
      timer.current = setInterval(() => setTime(t => t + 1), secondInterval);
    }
  };

  const checkWin = (nextPoints: number) => {
    return hand.length === 0 || (gameMode === MODE_TIMED && nextPoints === MATCHES_NEEDED);
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
    setDraws(_d => ++_d);
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

  const showGameSummary = () => {
    setView(SUMMARY);
  };

  return (
    <SafeAreaView style={globalStyles.wrapper}>
      <View style={globalStyles.header}>
        <Text style={[globalStyles.buttonText, globalStyles.gameButton, globalStyles.gameButtonLeft]}>{TITLE}</Text>
        <Text style={globalStyles.gameTitle}>{
          gameMode === MODE_TIMED ? TIMED :
          gameMode === MODE_ZEN ? ZEN :
          BASIC
        }</Text>
        <Pressable style={[globalStyles.gameButton, globalStyles.gameButtonRight]} onPress={restartGame}>
          <Text style={globalStyles.buttonText}>{RESTART}</Text>
        </Pressable>
      </View>
      <Cards hand={hand} selectCard={selectCard} selected={selected} />
      <View style={globalStyles.footer}>
        <Pressable style={[globalStyles.gameButton, globalStyles.gameButtonLeft]} onPress={showGameSummary}>
          <Text style={globalStyles.buttonText}>{END}</Text>
        </Pressable>
        <Text style={styles.points}>
          {gameMode === MODE_TIMED ? time
          : `${POINTS}: ${points}`}
        </Text>
        <Pressable style={[globalStyles.gameButton, globalStyles.gameButtonRight]} onPress={draw}>
          <Text style={globalStyles.buttonText}>{DRAW}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  points: {
    flex: 1,
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 5,
    color: COLOUR_TEXT,
  },
});
