import React, { useState } from 'react';

import {
  StyleSheet, View, Text,
  Pressable, ScrollView, Image,
  ImageSourcePropType } from 'react-native';

import {
  COLOUR_BORDER, COLOUR_TEXT, GAME_MODES, HOW_TO, MATCHES, NONE, MATCHES_NEEDED,
} from '../constants';

import { globalStyles } from '../styles';

interface IHowToMenuProps {
  images: ImageSourcePropType[],
  toLanding: () => void,
}

export default ({ images, toLanding }: IHowToMenuProps): JSX.Element => {
  const [howToVisible, setHowToVisible] = useState<number>(NONE);

  const toggleGameModes = () => (
    setHowToVisible(howToVisible === GAME_MODES ? NONE : GAME_MODES)
  );
  const toggleMatches = () => (
    setHowToVisible(howToVisible === MATCHES ? NONE : MATCHES)
  );

  const showHowToGameModes = howToVisible === GAME_MODES ? 'flex' : 'none';
  const showHowToMatches = howToVisible === MATCHES ? 'flex' : 'none';
  return (
    <View style={globalStyles.wrapper}>
      <View style={globalStyles.header}>
        <Text style={styles.howToTitle}>{HOW_TO}</Text>
        <Pressable
          style={styles.closeButton}
          onPress={toLanding}>
          <Text style={styles.closeButtonText}>x</Text>
        </Pressable>
      </View>
      <ScrollView style={globalStyles.content}>
        <Text style={styles.howToContentText}>
          Trois is the French word for "three".
        </Text>
        <Text style={styles.howToContentText}>
          In the game of Trois, there are many groups of three.
          There are three different shapes, which come in three different counts,
          and can have three different fillings, and three different colours.
        </Text>
        <Pressable style={styles.howToToggle} onPress={toggleGameModes}>
          <Text style={[globalStyles.buttonText, globalStyles.toggleButtonText]}>Game Modes</Text>
          <Text style={globalStyles.buttonText}>{howToVisible === GAME_MODES ? '-' : '+'}</Text>
        </Pressable>
        <View style={{ display: showHowToGameModes }}>
          <Text style={styles.howToContentText}>
            There are three game modes in Trois:
          </Text>
          <Text style={styles.howToContentListItem}>
            <Text style={globalStyles.underline}>Basic Mode</Text>:
            Try to hit 81 points, gain 3 points for a match,
            lose 1 point for a mistake, 81 unique cards.
          </Text>
          <Text style={styles.howToContentListItem}>
            <Text style={globalStyles.underline}>Timed Mode</Text>:
            Work toward {MATCHES_NEEDED} matches in as little time as possible.
            Used cards reshuffle into the deck.
          </Text>
          <Text style={styles.howToContentListItem}>
            <Text style={globalStyles.underline}>Zen Mode</Text>:
            Play forever, with no loss of points.
            Used cards will reshuffle into the deck.
          </Text>
        </View>
        <Pressable style={styles.howToToggle} onPress={toggleMatches}>
          <Text style={[globalStyles.buttonText, globalStyles.toggleButtonText]}>
            Finding a Match
          </Text>
          <Text style={globalStyles.buttonText}>{howToVisible === MATCHES ? '-' : '+'}</Text>
        </Pressable>
        <View style={{ display: showHowToMatches }}>
          <Text style={styles.howToContentText}>
            To score points, you must choose three cards that, for each of the 4
            characteristics (shape, colour, count, fill), are either entirely
            distinct, or all the exact same. If two cards have a matching
            characteristic, and the third does not, it will not be counted as
            a match under the game rules.
          </Text>
          <Text style={styles.howToContentText}>
            Match conditions include each of the following:
          </Text>
          <Text style={styles.howToContentListItem}>
            All but one feature of the cards are matching.
          </Text>
          <Text style={styles.howToContentListSubItem}>
            Example 1: colour, count and fill match, but shape does not; or
          </Text>
          <View style={styles.cardRow}>
            <Image source={images[0]} style={globalStyles.cardImage} />
            <Image source={images[1]} style={globalStyles.cardImage} />
            <Image source={images[2]} style={globalStyles.cardImage} />
          </View>
          <Text style={styles.howToContentListSubItem}>
            Example 2: fill, shape and count match, but colour does not.
          </Text>
          <View style={styles.cardRow}>
            <Image source={images[2]} style={globalStyles.cardImage} />
            <Image source={images[5]} style={globalStyles.cardImage} />
            <Image source={images[8]} style={globalStyles.cardImage} />
          </View>
          <Text style={styles.howToContentListItem}>
            Two features of the cards are matching, and two features are entirely distinct.
          </Text>
          <Text style={styles.howToContentListSubItem}>
            Example 1: shape and count match, but fill and colour do not; or
          </Text>
          <View style={styles.cardRow}>
            <Image source={images[13]} style={globalStyles.cardImage} />
            <Image source={images[37]} style={globalStyles.cardImage} />
            <Image source={images[70]} style={globalStyles.cardImage} />
          </View>
          <Text style={styles.howToContentListSubItem}>
            Example 2: colour and shape match, but count and fill do not.
          </Text>
          <View style={styles.cardRow}>
            <Image source={images[76]} style={globalStyles.cardImage} />
            <Image source={images[13]} style={globalStyles.cardImage} />
            <Image source={images[31]} style={globalStyles.cardImage} />
          </View>
          <Text style={styles.howToContentListItem}>
            Three of the four features of the cards are matching, and one feature does not.
          </Text>
          <Text style={styles.howToContentListSubItem}>
            Example 1: shape matches, but count, fill and colour do not; or
          </Text>
          <View style={styles.cardRow}>
            <Image source={images[6]} style={globalStyles.cardImage} />
            <Image source={images[39]} style={globalStyles.cardImage} />
            <Image source={images[72]} style={globalStyles.cardImage} />
          </View>
          <Text style={styles.howToContentListSubItem}>
            Example 2: colour matches, but shape, count and fill do not.
          </Text>
          <View style={styles.cardRow}>
            <Image source={images[58]} style={globalStyles.cardImage} />
            <Image source={images[50]} style={globalStyles.cardImage} />
            <Image source={images[12]} style={globalStyles.cardImage} />
          </View>
          <Text style={styles.howToContentListItem}>
            None of the features of the cards are matching.
          </Text>
          <Text style={styles.howToContentListSubItem}>
            Example: shape, count, fill and colour are all different.
          </Text>
          <View style={styles.cardRow}>
            <Image source={images[1]} style={globalStyles.cardImage} />
            <Image source={images[41]} style={globalStyles.cardImage} />
            <Image source={images[78]} style={globalStyles.cardImage} />
          </View>
        </View>
      </ScrollView>
      <View style={globalStyles.footer}>
        <Text>Copyright &copy; Christopher (Christofosho) Snow</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  howToTitle: {
    flex: 1,
    fontSize: 32,
    color: COLOUR_TEXT,
    marginLeft: 20,
  },
  closeButton: {
    marginRight: 20,
  },
  closeButtonText: {
    fontSize: 28,
    color: COLOUR_TEXT,
  },
  howToContentText: {
    fontSize: 20,
    color: COLOUR_TEXT,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  howToContentListItem: {
    fontSize: 18,
    color: COLOUR_TEXT,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  howToContentListSubItem: {
    fontSize: 16,
    color: COLOUR_TEXT,
    marginHorizontal: 10,
    marginBottom: 5,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: COLOUR_BORDER,
  },
  howToToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLOUR_BORDER,
    paddingTop: 25,
    marginTop: 10,
    marginHorizontal: 10,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
