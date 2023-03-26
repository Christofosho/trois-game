import React, { View, Text, Pressable } from 'react-native';
import { GAME_SUMMARY, MODE_TIMED } from '../constants';
import { globalStyles } from '../styles';

interface IGameSummaryProps {
  chooseMode: () => void,
  gameMode: number,
  getGameStartFunction: () => void,
  points: number,
  time: number,
  toLanding: () => void,
}

export default ({
  chooseMode,
  gameMode,
  getGameStartFunction,
  points,
  time,
  toLanding,
}: IGameSummaryProps) => (
  <View style={globalStyles.wrapper}>
    <View style={globalStyles.header}>
      <Text style={globalStyles.gameTitle}>{GAME_SUMMARY}</Text>
    </View>
    <View style={globalStyles.content}>
      {gameMode === MODE_TIMED
      ? <Text style={globalStyles.buttonText}>{points} matches in {time} seconds</Text>
      : <Text style={globalStyles.buttonText}>Final Score: {points} / 81</Text>}
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
