import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

import { RootState } from "../store";
import { BEST_SCORE, COLOUR_TEXT, DRAWS, MISTAKES, GAMES, MATCHES_, MOST_RECENT_GAME, STATISTICS, WINS } from "../constants";
import { globalStyles } from "../styles";

interface IStatistics {
  toLanding: () => void;
}

export default ({ toLanding }: IStatistics) => {
  const statistics = useSelector((state: RootState) => state.statistics);
  return (
    <View style={globalStyles.wrapper}>
      <View style={globalStyles.header}>
        <Text style={styles.statisticsTitle}>{STATISTICS}</Text>
        <Pressable
          style={globalStyles.closeButton}
          onPress={toLanding}>
          <FontAwesomeIcon icon={faXmark} />
        </Pressable>
      </View>
      <Text style={styles.warning}>Statistics are saved only on your local device!</Text>
      <ScrollView style={globalStyles.content}>
        {statistics.last && (
        <View>
          <Text style={[styles.heading]}>{MOST_RECENT_GAME}</Text>
          <View style={[styles.statisticsRow, globalStyles.hoveringBox]}>
            <View>
              <Text style={styles.text}>{MATCHES_}</Text>
              <Text style={styles.text}>{statistics.last?.matches}</Text>
            </View>
            <View>
              <Text style={styles.text}>{DRAWS}</Text>
              <Text style={styles.text}>{statistics.last?.draws}</Text>
            </View>
            <View>
              <Text style={styles.text}>{MISTAKES}</Text>
              <Text style={styles.text}>{statistics.last?.fails}</Text>
            </View>
          </View>
        </View>
        )}
        <Text style={styles.heading}>Basic Mode Summary</Text>
        <View style={[styles.statisticsRow, globalStyles.hoveringBox]}>
          <View>
            <Text style={styles.text}>{GAMES}</Text>
            <Text style={styles.text}>{statistics.basic.games}</Text>
          </View>
          <View>
            <Text style={styles.text}>{WINS}</Text>
            <Text style={styles.text}>{statistics.basic.wins}</Text>
          </View>
          <View>
            <Text style={styles.text}>{BEST_SCORE}</Text>
            <Text style={styles.text}>{statistics.basic.best}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  statisticsTitle: {
    flex: 1,
    fontSize: 32,
    color: COLOUR_TEXT,
    marginLeft: 10,
  },
  warning: {
    fontSize: 16,
    color: COLOUR_TEXT,
    textAlign: "center",
    marginBottom: 10,
  },
  statisticsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    color: COLOUR_TEXT,
    marginLeft: 20,
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
    color: COLOUR_TEXT,
    textAlign: "center",
  },
});
