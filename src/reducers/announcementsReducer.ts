import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import Queue from "../utils/queue";

export type AnnouncementType = {
  location: "top"|"middle"|"bottom";
  value: string;
  timeout: number;
};

interface AnnouncementState {
  current?: AnnouncementType;
}

const q = Queue<AnnouncementType>();

const initialState = {} satisfies AnnouncementState as AnnouncementState;

const announcementsSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {
    clearAnnouncements: () => initialState,
    addAnnouncement(state, action: PayloadAction<AnnouncementType>) {
      q.enqueue(action.payload);
      let current = state.current;
      if (!current) {
        current = q.dequeue();
      }
      return {
        ...state,
        current,
      };
    },
    nextAnnouncement(state) {
      const current = q.dequeue();
      return {
        ...state,
        current,
      };
    },
  },
});

export const { addAnnouncement, nextAnnouncement, clearAnnouncements } = announcementsSlice.actions;
export default announcementsSlice.reducer;
