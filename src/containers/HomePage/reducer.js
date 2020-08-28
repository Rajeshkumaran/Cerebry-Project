import { LOAD_ARGUMENTS } from "./constants";
export const initialState = {
  arguments: {
    isParamsError: false,
  },
};
const reducer = (preloadedState = null) => (
  state = preloadedState || initialState,
  action,
) => {
  switch (action.type) {
    case LOAD_ARGUMENTS: {
      return { ...state, arguments: { ...state.arguments, ...action.payload } };
    }

    default: {
      return state;
    }
  }
};
export default reducer;
