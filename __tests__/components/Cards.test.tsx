// Write UI Integration testing for the Cards component default export.
// Use the following test cases:
// Test component renders
// It renders the correct number of cards
// It renders the correct card content
// It renders the correct card image
import React from "react";
import { render, screen } from "@testing-library/react-native";
import "@testing-library/jest-native";
import Cards from "../../src/components/Cards";
import { NO_CARDS_REMAINING } from "../../src/constants";
import { cardKey, getNewDeck } from "../../src/utils/deck";

const images: number[] = [...Array(81).keys()];

const mockDeck = getNewDeck(images);
const mockHand = mockDeck.slice(0, 12);

describe("Cards", () => {
  it("should show NO_CARDS_REMAINING text without a hand", () => {
    render(<Cards
      hand={[]}
      selected={[]}
      selectCard={jest.fn()}
    />);
    expect(screen.getByText(NO_CARDS_REMAINING)).toBeOnTheScreen();
  });

  it("should render", () => {
    render(<Cards
      hand={mockHand}
      selected={[]}
      selectCard={jest.fn()}
    />);
    expect(screen.getByTestId(cardKey(mockHand[0]))).toBeOnTheScreen();
  });
  // It renders the correct number of cards

  // It renders the correct card content

  // It renders the correct card image

});


