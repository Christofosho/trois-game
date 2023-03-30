import React, {
  View, Text, Pressable,
  Image, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { GAME_SUMMARY, IMAGE, MODE_TIMED } from '../constants';
import { globalStyles } from '../styles';
import { Match } from '../types';
import { ScrollView } from 'react-native';

interface IGameSummaryProps {
  chooseMode: () => void,
  gameMode: number,
  getGameStartFunction: () => void,
  points: number,
  time: number,
  toLanding: () => void,
  matches: Match[],
}

export default ({
  chooseMode,
  gameMode,
  getGameStartFunction,
  points,
  time,
  toLanding,
  matches,
}: IGameSummaryProps) => (
  <View style={globalStyles.wrapper}>
    <View style={globalStyles.header}>
      <Text style={globalStyles.gameTitle}>{GAME_SUMMARY}</Text>
    </View>
    <View style={globalStyles.content}>
      {gameMode === MODE_TIMED
      ? <Text style={globalStyles.buttonText}>{points} matches in {time} seconds</Text>
      : <Text style={globalStyles.buttonText}>Final Score: {points} / 81</Text>}
      <ScrollView>
      {matches.map((match, index: number) => {
        return (
          <View key={index} style={styles.matchrow}>
            <View style={styles.spacer} />
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
            <View style={styles.icon}>
              {match.success
              ? <Icon name="checkcircle" size={40} color={'#ACF3AE'} />
              : <Icon name="closecircle" size={40} color={'#FA6B84'} />
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
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center',
  },
  cardRow: {
    marginBottom: '10%',
  },
  cardGap: { gap: 20 },
  icon: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  spacer: {
    width: 40,
    marginRight: 10,
  },
});
