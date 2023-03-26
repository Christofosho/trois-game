import React, { Pressable, SafeAreaView, Text, View } from 'react-native';
import { globalStyles } from '../styles';
import { BASIC, MODE_BASIC, MODE_TIMED, MODE_ZEN, TIMED, ZEN } from '../constants';

interface IModeSelectorProps {
  startGame: (_mode: number) => void,
}

export default ({ startGame }: IModeSelectorProps) => {
  // Point based, 81 cards in the deck, 1 deck.
  const startGameBasic = () => startGame(MODE_BASIC);

  // Time based, play until 100 points, cards
  // are reshuffled into the deck after use.
  const startGameTimed = () => startGame(MODE_TIMED);

  // Score based, play forever, cards are
  // reshuffled into the deck after use.
  const startGameZen = () => startGame(MODE_ZEN);

  return (
    <SafeAreaView style={globalStyles.menu}>
      <View style={globalStyles.buttonColumn}>
        <Pressable onPress={startGameBasic}>
          <Text style={globalStyles.columnButton}>{BASIC}</Text>
        </Pressable>
        <Pressable onPress={startGameTimed}>
          <Text style={globalStyles.columnButton}>{TIMED}</Text>
        </Pressable>
        <Pressable onPress={startGameZen}>
          <Text style={globalStyles.columnButton}>{ZEN}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
