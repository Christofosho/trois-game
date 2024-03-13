import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { COLOUR_TEXT, DRAWS, FAILS, GAMES, MOST_RECENT_GAME, STATISTICS, WINS } from "../constants";
import { globalStyles } from "../styles";

interface IStatistics {
  toLanding: () => void;
}

export default ({ toLanding }: IStatistics) => {
  const games = useSelector((state: RootState) => state.statistics.games);
  const wins = useSelector((state: RootState) => state.statistics.wins);
  const draws = useSelector((state: RootState) => state.statistics.draws);
  const fails = useSelector((state: RootState) => state.statistics.fails);
  const last = useSelector((state: RootState) => state.statistics.last);
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
        <View style={styles.statisticsRow}>
          <View>
            <Text style={styles.text}>{GAMES}</Text>
            <Text style={styles.text}>{games}</Text>
          </View>
          <View>
            <Text style={styles.text}>{WINS}</Text>
            <Text style={styles.text}>{wins}</Text>
          </View>
          <View>
            <Text style={styles.text}>{DRAWS}</Text>
            <Text style={styles.text}>{draws}</Text>
          </View>
          <View>
            <Text style={styles.text}>{FAILS}</Text>
            <Text style={styles.text}>{fails}</Text>
          </View>
        </View>
        {last && (
        <View>
          <Text style={styles.text}>{MOST_RECENT_GAME}</Text>
          <View style={styles.statisticsRow}>
            <Text style={styles.text}>{last?.matches}</Text>
            <Text style={styles.text}>{last?.draws}</Text>
            <Text style={styles.text}>{last?.fails}</Text>
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
  text: {
    fontSize: 20,
    color: COLOUR_TEXT,
    marginHorizontal: 10,
    marginBottom: 15,
  },
});
