import React, {
  View, Text, Pressable,
  Image, StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import { GAME_SUMMARY, IMAGE, MODE_BASIC, MODE_TIMED, MODE_ZEN } from "../constants";
import { globalStyles } from "../styles";
import { Match } from "../types";
import { ScrollView } from "react-native";

interface IGameSummaryProps {
  draws: number,
  gameMode: number,
  matches: Match[],
  points: number,
  time: number,
  chooseMode: () => void,
  getGameStartFunction: () => void,
  toLanding: () => void,
}

export default ({
  draws,
  gameMode,
  matches,
  points,
  time,
  chooseMode,
  getGameStartFunction,
  toLanding,
}: IGameSummaryProps) => (
  <View style={globalStyles.wrapper}>
    <View style={globalStyles.header}>
      <Text style={globalStyles.gameTitle}>{GAME_SUMMARY}</Text>
    </View>
    <View style={globalStyles.content}>
      {gameMode === MODE_TIMED
      ? <Text style={globalStyles.buttonText}>{points} matches in {time} seconds</Text>
      : <Text style={globalStyles.buttonText}>Final Score: {points}{gameMode === MODE_BASIC ? "/ 81" : ""}</Text>}
      {gameMode !== MODE_ZEN && <Text style={globalStyles.buttonText}>Total draw count: {draws}</Text>}
      {matches.length > 0 && <View style={globalStyles.horizontalRule} />}
      <ScrollView>
      {matches.map((match, index: number) => {
        return (
          <View key={index} style={styles.matchrow}>
            <View style={styles.index}>
              <Text style={styles.indexText}>{index + 1}</Text>
            </View>
            <View style={[globalStyles.cardRow, styles.cardRow, styles.cardGap]}>
              <View style={globalStyles.card}>
                <Image source={match.match[0][IMAGE]} style={globalStyles.cardImage} />
              </View>
              <View style={globalStyles.card}>
                <Image source={match.match[1][IMAGE]} style={globalStyles.cardImage} />
              </View>
              <View style={globalStyles.card}>
                <Image source={match.match[2][IMAGE]} style={globalStyles.cardImage} />
              </View>
            </View>
            <View style={styles.iconContainer}>
              {match.success
              ? <Icon name="checkcircle" size={25} color={"#ACF3AE"} style={styles.icon} />
              : <Icon name="closecircle" size={25} color={"#FA6B84"} style={styles.icon} />
              }
            </View>
          </View>
        );
      })}
      </ScrollView>
    </View>
    <View style={globalStyles.footer}>
      <Pressable style={[globalStyles.gameButton, globalStyles.gameButtonLeft]} onPress={toLanding}>
        <Text style={globalStyles.buttonText}>Menu</Text>
      </Pressable>
      <Pressable style={globalStyles.gameButton} onPress={getGameStartFunction}>
        <Text style={globalStyles.buttonText}>Again</Text>
      </Pressable>
      <Pressable style={[globalStyles.gameButton, globalStyles.gameButtonRight]} onPress={chooseMode}>
        <Text style={globalStyles.buttonText}>New</Text>
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  matchrow: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: "10%",
    alignSelf: "center",
  },
  cardRow: {
    flex: 1,
  },
  cardGap: { gap: 5 },
  iconContainer: {
    width: "10%",
    justifyContent: "center",
  },
  icon: {
    alignSelf: "center",
  },
  index: {
    width: "10%",
    justifyContent: "center",
  },
  indexText: {
    fontSize: 20,
    alignSelf: "center",
  },
});
