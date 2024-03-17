import { updateStatistics } from "../reducers/statisticsReducer";
import { AppDispatch } from "../store";
import { Statistics } from "../types";
import { get, store } from "../utils/storage";

const key = "statistics";

export const loadStatistics = async (dispatch: AppDispatch) => {
  dispatch(updateStatistics(await get(key)));
};

export const storeStatistics = async (dispatch: AppDispatch, value: Statistics) => {
  await store(key, value);
  loadStatistics(dispatch);
};
