import React, { useEffect, useRef, useState } from "react";
import {
  ImageSourcePropType, Pressable,
  StyleSheet, Text, View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { addAnnouncementToQueue } from "../actions/announcementsActions";
import { storeStatistics } from "../actions/statisticsActions";

import Cards from "../components/Cards";

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
} from "../constants";

import { updatePoints, updateDraws, updateFails } from "../reducers/gameReducer";

import { AppDispatch, RootState } from "../store";

import { globalStyles } from "../styles";

import { Card, Match } from "../types";

import { checkCards, drawThree, getNewDeck, shuffle } from "../utils/deck";

const toast = (dispatch: AppDispatch, message: string) => {
  addAnnouncementToQueue(dispatch, { value: message, location: "bottom", timeout: 3000 });
};

interface IGameBoardProps {
  gameMode: number,
  images: ImageSourcePropType[],
  time: number,
  addSelection: (_match: Match) => void,
  setTime: (_time: (_t: number) => number) => void,
  setView: (_view: number) => void,
  startGame: () => void,
}

export default ({
  gameMode,
  images,
  time,
  addSelection,
  setTime,
  setView,
  startGame,
}: IGameBoardProps) => {
  const dispatch = useDispatch();

  const statistics = useSelector((state: RootState) => state.statistics);
  const points = useSelector((state: RootState) => state.game.points);
  const draws = useSelector((state: RootState) => state.game.draws);
  const fails = useSelector((state: RootState) => state.game.fails);

  const [matches, setMatches] = useState<number>(0);

  const [deck, setDeck] = useState<Card[]>([]);
  const [hand, setHand] = useState<Card[]>([]);

  // selected: A list of indicies found in hand.
  const [selected, setSelected] = useState<number[]>([]);

  const timer = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    getHandAndDeck();
    tryStartTimer();
    return () => {
      if (timer) {
        clearInterval(timer.current);
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
        setMatches(m => m + 1);

        let nextPoints = points;
        if (gameMode === MODE_BASIC) {
          nextPoints += 3;
          toast(dispatch, `${TOAST_MATCH_SUCCESS} ${TOAST_PLUS_THREE_POINTS}`);
        }
        else {
          nextPoints += 1;
          toast(dispatch, `${TOAST_MATCH_SUCCESS} ${TOAST_PLUS_ONE_POINT}`);
        }

        dispatch(updatePoints(nextPoints));
        if (checkWin(nextPoints)) {
          toast(dispatch, TOAST_GAME_COMPLETE);
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
        dispatch(updateFails(fails + 1));
        if (gameMode === MODE_BASIC) {
          dispatch(updatePoints(Math.max(0, points - 1)));
          toast(dispatch, `${TOAST_MATCH_FAILURE} ${TOAST_MINUS_ONE_POINT}`);
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
    dispatch(updatePoints(0));
    dispatch(updateDraws(0));
    dispatch(updateFails(0));

    getHandAndDeck();
    setSelected([]);

    tryStartTimer();

    startGame();
  };

  const tryStartTimer = () => {
    if (timer){
      clearInterval(timer.current);
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
      toast(dispatch, TOAST_DECK_TOO_SMALL);
      return;
    }

    if (hand.length >= MAX_HAND_SIZE) {
      toast(dispatch, TOAST_HAND_TOO_LARGE);
      return;
    }

    const [nextDeck, nextHand] = drawThree(deck, hand);
    setDeck(nextDeck);
    setHand(nextHand);
    dispatch(updateDraws(draws + 1));
    setSelected([]);
  };

  const selectCard = (cardValue: number) => {
    let nextSelected = selected.slice();
    if (nextSelected.includes(cardValue)) {
      nextSelected = nextSelected.filter(s => s !== cardValue);
    }
    else if (selected.length === 3) {
      toast(dispatch, TOAST_THREE_SELECTED_MAX);
      return;
    }
    else {
      nextSelected.push(cardValue);
    }

    setSelected(nextSelected);
  };

  const showGameSummary = () => {
    if (gameMode === MODE_BASIC) {
      const win: number = Number(checkWin(points));
      const nextStatistics = { ...statistics };
      nextStatistics.basic = {
        games: statistics.basic.games + 1,
        wins: statistics.basic.wins + win,
        matches: statistics.basic.matches + matches,
        draws: statistics.basic.draws + draws,
        fails: statistics.basic.fails + fails,
        best: Math.max(statistics.basic.best, points),
      };
      storeStatistics(dispatch, {
        ...nextStatistics,
        last: { matches, draws, fails, cards: [] },
      });
    }
    setView(SUMMARY);
  };

  return (
    <View style={globalStyles.wrapper}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  points: {
    flex: 1,
    fontSize: 24,
    textAlign: "center",
    paddingVertical: 5,
    color: COLOUR_TEXT,
  },
});
