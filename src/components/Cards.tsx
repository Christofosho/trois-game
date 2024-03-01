import React, { FlatList, StyleSheet, Text, View } from "react-native";

import CardComponent from "./Card";

import { CARD_HEIGHT, NO_CARDS_REMAINING, VALUE } from "../constants";

import { cardKey } from "../utils/deck";

import { Card } from "../types";

const getItemLayout = (_data: Card[] | null | undefined, index: number) => (
  {length: CARD_HEIGHT, offset: CARD_HEIGHT * index, index}
);

const renderVerticalCardGap = () => <View style={styles.verticalCardGap} />;

interface ICardsProps {
  hand: Card[],
  selected: number[],
  selectCard: (_value: number) => void,
}

export default ({ hand, selected, selectCard }: ICardsProps): JSX.Element => {
  if (hand.length === 0) {
    return (
      <Text style={styles.noCards}>
        {NO_CARDS_REMAINING}
      </Text>
    );
  }
  const renderCard = ({ item }: { item: Card }) => (
    <CardComponent
      item={item}
      isSelected={selected.includes(item[VALUE])}
      selectCard={selectCard}
    />
  );

  return (
    <FlatList
      data={hand}
      numColumns={3}
      style={styles.cards}
      renderItem={renderCard}
      keyExtractor={cardKey}
      columnWrapperStyle={styles.cardColumn}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={renderVerticalCardGap}
      getItemLayout={getItemLayout}
    />
  );
};

const styles = StyleSheet.create({
  cards: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  cardColumn: {
    justifyContent: "space-around",
  },
  verticalCardGap: {
    height: 5,
  },
  noCards: {
    flex: 1,
  },
});
