import React, { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { globalStyles } from "../styles";
import { BASIC, COLOUR_TEXT, MODE_BASIC, MODE_TIMED, MODE_ZEN, MODE_SELECTION, TIMED, ZEN } from "../constants";

interface IModeSelectorProps {
  startGame: (_mode: number) => void,
  toLanding: () => void,
}

export default ({ startGame, toLanding }: IModeSelectorProps) => {
  // Point based, 81 cards in the deck, 1 deck.
  const startGameBasic = () => startGame(MODE_BASIC);

  // Time based, play until 100 points, cards
  // are reshuffled into the deck after use.
  const startGameTimed = () => startGame(MODE_TIMED);

  // Score based, play forever, cards are
  // reshuffled into the deck after use.
  const startGameZen = () => startGame(MODE_ZEN);

  return (
    <View style={globalStyles.wrapper}>
      <View style={globalStyles.header}>
        <Text style={styles.modeSelectionTitle}>{MODE_SELECTION}</Text>
        <Pressable
          style={globalStyles.closeButton}
          onPress={toLanding}>
          <FontAwesomeIcon icon={faXmark} />
        </Pressable>
      </View>
      <View style={globalStyles.menu}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modeSelectionTitle: {
    flex: 1,
    fontSize: 32,
    color: COLOUR_TEXT,
    marginLeft: 10,
  },
});
