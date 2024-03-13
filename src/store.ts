import { configureStore } from "@reduxjs/toolkit";
import announcementsReducer from "./reducers/announcementsReducer";
import statisticsReducer from "./reducers/statisticsReducer";

export const store = configureStore({
  reducer: {
    announcements: announcementsReducer,
    statistics: statisticsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
