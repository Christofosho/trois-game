import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { COLOUR_TEXT, DRAWS, FAILS, GAMES, MATCHES_, MOST_RECENT_GAME, STATISTICS, WINS } from "../constants";
import { globalStyles } from "../styles";

interface IStatistics {
  toLanding: () => void;
}

export default ({ toLanding }: IStatistics) => {
  const statistics = useSelector((state: RootState) => state.statistics);
  return (
    <View style={globalStyles.wrapper}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.gameTitle}>{STATISTICS}</Text>
        <Pressable
          style={globalStyles.closeButton}
          onPress={toLanding}>
          <Text style={globalStyles.closeButtonText}>X</Text>
        </Pressable>
      </View>
      <ScrollView style={globalStyles.content}>
        {statistics.last && (
        <View>
          <Text style={[styles.heading]}>{MOST_RECENT_GAME}</Text>
          <View style={[styles.statisticsRow, globalStyles.hoveringBox]}>
            <View>
              <Text style={styles.text}>Matches</Text>
              <Text style={styles.text}>{statistics.last?.matches}</Text>
            </View>
            <View>
              <Text style={styles.text}>Draws</Text>
              <Text style={styles.text}>{statistics.last?.draws}</Text>
            </View>
            <View>
              <Text style={styles.text}>Fails</Text>
              <Text style={styles.text}>{statistics.last?.fails}</Text>
            </View>
          </View>
        </View>
        )}
        <Text style={styles.heading}>Basic Mode Summary</Text>
        <View style={[styles.statisticsRow, globalStyles.hoveringBox]}>
          <View>
            <Text style={[styles.text, styles.statisticHeading]}>{GAMES}</Text>
            <Text style={styles.text}>{statistics.basic.games}</Text>
          </View>
          <View>
            <Text style={[styles.text, styles.statisticHeading]}>{MATCHES_}</Text>
            <Text style={styles.text}>{statistics.basic.matches}</Text>
          </View>
          <View>
            <Text style={[styles.text, styles.statisticHeading]}>{WINS}</Text>
            <Text style={styles.text}>{statistics.basic.wins}</Text>
          </View>
          <View>
            <Text style={[styles.text, styles.statisticHeading]}>{DRAWS}</Text>
            <Text style={styles.text}>{statistics.basic.draws}</Text>
          </View>
          <View>
            <Text style={[styles.text, styles.statisticHeading]}>{FAILS}</Text>
            <Text style={styles.text}>{statistics.basic.fails}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  statisticsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    color: COLOUR_TEXT,
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
    color: COLOUR_TEXT,
    textAlign: "center",
  },
  statisticHeading: {
    marginRight: 5,
  },
});
