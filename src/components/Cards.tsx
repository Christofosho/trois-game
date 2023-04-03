import React, {
  FlatList, Image, Pressable,
  StyleSheet, Text, View,
} from 'react-native';
import { Card } from '../types';
import {
  CARD_HEIGHT, COLOUR, COUNT, FILL,
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
  const selectedOutline = isSelected ? {
    borderWidth: 1,
    borderColor: 'rgba(60, 0, 0, 0.4)',
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
    justifyContent: 'space-around',
  },
  verticalCardGap: {
    height: 5,
  },
});
