import { createSelector } from "reselect";
import { get } from "../utils/helpers";
const selectAppState = (state) => get(state, "appState", null) || {};
const selectHomePageState = (state) => get(state, "homePage", null) || {};
const selectArguments = createSelector(selectHomePageState, (substate) => {
  return get(substate, "arguments", {});
});
export { selectAppState, selectHomePageState, selectArguments };
