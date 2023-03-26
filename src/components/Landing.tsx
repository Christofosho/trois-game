import React, { Pressable, SafeAreaView, Text, View } from 'react-native';
import { TITLE, NEW_GAME, HOW_TO } from '../constants';
import { globalStyles } from '../styles';

interface ILandingProps {
  chooseMode: () => void,
  toggleHowTo: () => void,
}

export default ({ chooseMode, toggleHowTo }: ILandingProps) => (
  <SafeAreaView style={globalStyles.menu}>
    <View><Text style={globalStyles.title}>{TITLE}</Text></View>
    <View style={globalStyles.buttonColumn}>
      <Pressable onPress={chooseMode}>
        <Text style={globalStyles.columnButton}>{NEW_GAME}</Text>
      </Pressable>
      <Pressable onPress={toggleHowTo}>
        <Text style={globalStyles.columnButton}>{HOW_TO}</Text>
      </Pressable>
    </View>
  </SafeAreaView>
);
