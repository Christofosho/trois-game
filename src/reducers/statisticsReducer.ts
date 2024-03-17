import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Statistics } from "../types";

const initialState = {
  basic: {
    games: 0,
    wins: 0,
    matches: 0,
    draws: 0,
    fails: 0,
  },
  last: null,
} satisfies Statistics as Statistics;

const statisticsSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {
    updateStatistics(state, action: PayloadAction<Statistics|null>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateStatistics } = statisticsSlice.actions;
export default statisticsSlice.reducer;
