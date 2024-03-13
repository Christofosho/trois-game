import { updateStatistics } from "../reducers/statisticsReducer";
import { AppDispatch } from "../store";
import { get } from "../utils/storage";

export const loadStatistics = async (dispatch: AppDispatch) => {
  dispatch(updateStatistics(await get("statistics")));
};
