import React, {
  View, Text, Pressable,
  Image, ScrollView, StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";

import { GAME_SUMMARY, IMAGE, MODE_BASIC, MODE_TIMED, MODE_ZEN } from "../constants";
import { RootState } from "../store";
import { globalStyles } from "../styles";
import { Match } from "../types";
import { updateDraws, updateFails, updatePoints } from "../reducers/gameReducer";

interface IGameSummaryProps {
  gameMode: number,
  matches: Match[],
  time: number,
  chooseMode: () => void,
  getGameStartFunction: () => void,
  toLanding: () => void,
}

export default ({
  gameMode,
  matches,
  time,
  chooseMode,
  getGameStartFunction,
  toLanding,
}: IGameSummaryProps) => {
  const dispatch = useDispatch();

  const points = useSelector((state: RootState) => state.game.points);
  const draws = useSelector((state: RootState) => state.game.draws);
  const fails = useSelector((state: RootState) => state.game.fails);

  const menu = () => {
    dispatch(updatePoints(0));
    dispatch(updateDraws(0));
    dispatch(updateFails(0));
    toLanding();
  };

  const again = () => {
    dispatch(updatePoints(0));
    dispatch(updateDraws(0));
    dispatch(updateFails(0));
    getGameStartFunction();
  };

  const newGame = () => {
    dispatch(updatePoints(0));
    dispatch(updateDraws(0));
    dispatch(updateFails(0));
    chooseMode();
  };

  return (
    <View style={globalStyles.wrapper}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.gameTitle}>{GAME_SUMMARY}</Text>
      </View>
      <View style={globalStyles.content}>
        {gameMode === MODE_TIMED
        ? <Text style={globalStyles.buttonText}>{points} matches in {time} seconds</Text>
        : <Text style={globalStyles.buttonText}>Final Score: {points}{gameMode === MODE_BASIC ? " / 81" : ""} ({fails} mistake{fails > 1 && "s"})</Text>}
        {gameMode !== MODE_ZEN && <Text style={globalStyles.buttonText}>Total draw count: {draws}</Text>}
        {matches.length > 0 && <View style={globalStyles.horizontalRule} />}
        <ScrollView>
        {matches.map((match, index: number) => {
          return (
            <View style={styles.matchrow}>
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
        <Pressable style={[globalStyles.gameButton, globalStyles.gameButtonLeft]} onPress={menu}>
          <Text style={globalStyles.buttonText}>Menu</Text>
        </Pressable>
        <Pressable style={globalStyles.gameButton} onPress={again}>
          <Text style={globalStyles.buttonText}>Again</Text>
        </Pressable>
        <Pressable style={[globalStyles.gameButton, globalStyles.gameButtonRight]} onPress={newGame}>
          <Text style={globalStyles.buttonText}>New</Text>
        </Pressable>
      </View>
    </View>
  );
};

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
