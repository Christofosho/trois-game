import React from "react";
import { Image, Pressable, Text } from "react-native";
import { Card } from "../types";
import { globalStyles } from "../styles";
import { IMAGE, VALUE, showKey } from "../constants";
import { cardKey } from "../utils/deck";
import { getAltText } from "../utils/images";

interface ICardProps {
  item: Card,
  isSelected: boolean,
  selectCard: (_value: number) => void
}
export default ({ item, isSelected, selectCard }: ICardProps): JSX.Element => {
  const fontWeight = isSelected ? "bold" : "normal";
  const selectedOutline = isSelected ? {
    borderWidth: 1,
    borderColor: "rgba(60, 0, 0, 0.5)",
    elevation: 15,
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 2, width: 6,
    },
  } : null;
  return (
    <Pressable style={[globalStyles.card, selectedOutline ]}
      onPress={() => selectCard(item[VALUE])}>
      {showKey
      ? <Text style={{ fontWeight }}>{cardKey(item)}</Text>
      : <Image source={item[IMAGE]}
          // Describe the image to screen readers using alt text
          style={globalStyles.cardImage}
          alt={getAltText(item[VALUE])}
          testID={cardKey(item)} />
      }
    </Pressable>
  );
};
