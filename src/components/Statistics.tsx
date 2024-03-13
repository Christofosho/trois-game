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
        <Text style={styles.heading}>Basic</Text>
        <View style={styles.statisticsRow}>
          <View>
            <Text style={styles.text}>{GAMES}</Text>
            <Text style={styles.text}>{statistics.basic.games}</Text>
          </View>
          <View>
            <Text style={styles.text}>{MATCHES_}</Text>
            <Text style={styles.text}>{statistics.basic.matches}</Text>
          </View>
          <View>
            <Text style={styles.text}>{WINS}</Text>
            <Text style={styles.text}>{statistics.basic.wins}</Text>
          </View>
          <View>
            <Text style={styles.text}>{DRAWS}</Text>
            <Text style={styles.text}>{statistics.basic.draws}</Text>
          </View>
          <View>
            <Text style={styles.text}>{FAILS}</Text>
            <Text style={styles.text}>{statistics.basic.fails}</Text>
          </View>
        </View>
        {statistics.last && (
        <View>
          <Text style={styles.text}>{MOST_RECENT_GAME}</Text>
          <View style={styles.statisticsRow}>
            <Text style={styles.text}>{statistics.last?.matches}</Text>
            <Text style={styles.text}>{statistics.last?.draws}</Text>
            <Text style={styles.text}>{statistics.last?.fails}</Text>
          </View>
        </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  statisticsRow: {
    flexDirection: "row",
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    color: COLOUR_TEXT,
  },
  text: {
    fontSize: 20,
    color: COLOUR_TEXT,
    marginHorizontal: 10,
    marginBottom: 15,
  },
});
