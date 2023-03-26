import React, { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from '../types';
import {
  CARD_HEIGHT, CARD_WIDTH, COLOUR,
  COLOUR_BORDER, COUNT, FILL,
  IMAGE, SHAPE, VALUE, showKey,
} from '../constants';
import { globalStyles } from '../styles';

interface ICardProps {
  item: Card,
  isSelected: boolean,
  selectCard: (_value: number) => void
}
const CardComponent = ({ item, isSelected, selectCard }: ICardProps): JSX.Element => {
  const fontWeight = isSelected ? 'bold' : 'normal';
  const backgroundColor = isSelected ? '#EEEEEE' : undefined;
  const selectedOutline = isSelected ? { borderWidth: 1, borderColor: '#AA0000' } : null;
  return (
    <Pressable style={[styles.card, { backgroundColor }, selectedOutline ]}
      onPress={() => selectCard(item[VALUE])}>
      {showKey
      ? <Text style={{ fontWeight }}>{cardKey(item)}</Text>
      : <Image source={item[IMAGE]}
          style={globalStyles.cardImage} />
      }
    </Pressable>
  );
};

const cardKey = (card: Card) => {
  return `${card[SHAPE]}-${card[COUNT]}-${card[COLOUR]}-${card[FILL]}`;
};

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
      ItemSeparatorComponent={renderVerticalCardGap}
      getItemLayout={getItemLayout}
    />
  );
};

const styles = StyleSheet.create({
  cards: {
    flex: 1,
  },
  cardColumn: {
    justifyContent: 'space-around',
  },
  card: {
    height: CARD_HEIGHT + 8,
    width: CARD_WIDTH + 8,
    padding: 3,
    borderWidth: 1,
    borderColor: COLOUR_BORDER,
    borderRadius: 5,
  },
  verticalCardGap: {
    height: 5,
  },
});
