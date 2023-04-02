import { Dimensions, StyleSheet } from 'react-native';
import {
  CARD_HEIGHT, CARD_WIDTH, COLOUR_BACKGROUND,
  COLOUR_BACKGROUND_CONTRAST, COLOUR_BORDER, COLOUR_TEXT,
  COLOR_BLACK,
} from './constants';

export const globalStyles = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline',
  },

  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLOUR_BACKGROUND,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOUR_BORDER,
    backgroundColor: COLOUR_BACKGROUND_CONTRAST,
    shadowColor: COLOR_BLACK,
    shadowOffset: {width: -1, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },
  content: {
    flex: 1,
    marginHorizontal: 10,
  },
  footer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 5,
    borderTopWidth: 1,
    borderTopColor: COLOUR_BORDER,
    backgroundColor: COLOUR_BACKGROUND_CONTRAST,
    shadowColor: COLOR_BLACK,
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },

  menu: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOUR_BACKGROUND,
  },
  title: {
    fontSize: 92,
    color: COLOUR_TEXT,
  },
  buttonColumn: {
    width: '80%',
    gap: 40,
  },
  columnButton: {
    width: '100%',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: COLOUR_BORDER,
    paddingVertical: 10,
    paddingHorizontal: 25,
    fontSize: 32,
    color: COLOUR_TEXT,
    textAlign: 'center',
    backgroundColor: COLOUR_BACKGROUND_CONTRAST,
    shadowColor: COLOR_BLACK,
    shadowOffset: {width: -1, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },

  gameTitle: {
    flex: 1,
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    paddingVertical: 5,
  },
  gameButton: {
    width: '30%',
    paddingVertical: 5,
    borderColor: COLOUR_BORDER,
  },
  gameButtonLeft: {
    borderRightWidth: 1,
  },
  gameButtonRight: {
    borderLeftWidth: 1,
  },

  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  card: {
    height: CARD_HEIGHT + 8,
    width: CARD_WIDTH + 8,
    padding: 3,
    borderWidth: 1,
    borderColor: COLOUR_BORDER,
    borderRadius: 6,
    backgroundColor: COLOUR_BACKGROUND_CONTRAST,
    shadowColor: COLOR_BLACK,
    shadowOffset: {width: -2, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImage: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    resizeMode: 'cover',
  },
  buttonText: {
    fontSize: 24,
    textAlign: 'center',
    color: COLOUR_TEXT,
  },
  toggleButtonText: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
});