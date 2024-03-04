import { AppDispatch } from "../store";

import { AnnouncementType, addAnnouncement, nextAnnouncement } from "../reducers/announcementsReducer";

export const takeAnnouncementFromQueue = (dispatch: AppDispatch) => {
  dispatch(nextAnnouncement());
};

export const addAnnouncementToQueue = (dispatch: AppDispatch, announcement: AnnouncementType) => {
  dispatch(addAnnouncement(announcement));
};
