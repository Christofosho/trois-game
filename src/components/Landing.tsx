import React, { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";
import { TITLE, PLAY_GAME, HOW_TO, STATISTICS } from "../constants";
import { globalStyles } from "../styles";

interface ILandingProps {
  chooseMode: () => void,
  showStatistics: () => void,
  toggleHowTo: () => void,
  images: ImageSourcePropType[],
}

export default ({ chooseMode, showStatistics, toggleHowTo, images }: ILandingProps) => (
  <View style={globalStyles.menu}>
    <View><Text style={[globalStyles.title, styles.title]}>{TITLE}</Text></View>
    <View style={[globalStyles.cardRow, styles.cardRow, styles.cardGap]}>
      <View style={globalStyles.card}>
        <Image source={images[1]} style={globalStyles.cardImage} />
      </View>
      <View style={globalStyles.card}>
        <Image source={images[41]} style={globalStyles.cardImage} />
      </View>
      <View style={globalStyles.card}>
        <Image source={images[78]} style={globalStyles.cardImage} />
      </View>
    </View>
    <View style={globalStyles.buttonColumn}>
      <Pressable onPress={chooseMode}>
        <Text style={globalStyles.columnButton}>{PLAY_GAME}</Text>
      </Pressable>
      <Pressable onPress={showStatistics}>
        <Text style={globalStyles.columnButton}>{STATISTICS}</Text>
      </Pressable>
      <Pressable onPress={toggleHowTo}>
        <Text style={globalStyles.columnButton}>{HOW_TO}</Text>
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  title: {
    marginBottom: "10%",
  },
  cardRow: {
    marginBottom: "10%",
  },
  cardGap: { gap: 20 },
});
