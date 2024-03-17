import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameBoard } from "../types";

const initialState = {
  points: 0,
  draws: 0,
  fails: 0,
} satisfies GameBoard as GameBoard;

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updatePoints(state, action: PayloadAction<number>) {
      return {
        ...state,
        points: action.payload,
      };
    },
    updateDraws(state, action: PayloadAction<number>) {
      return {
        ...state,
        draws: action.payload,
      };
    },
    updateFails(state, action: PayloadAction<number>) {
      return {
        ...state,
        fails: action.payload,
      };
    },
  },
});

export const { updatePoints, updateDraws, updateFails } = gameSlice.actions;
export default gameSlice.reducer;
