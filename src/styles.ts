import { StyleSheet } from 'react-native';
import { CARD_HEIGHT, CARD_WIDTH, COLOUR_BACKGROUND, COLOUR_BORDER, COLOUR_TEXT } from './constants';

export const globalStyles = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline',
  },

  wrapper: {
    flex: 1,
    flexDirection: 'column',
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
