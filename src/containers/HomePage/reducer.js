import { LOAD_ARGUMENTS } from "./constants";
export const initialState = {
  arguments: {},
};
const reducer = (preloadedState = null) => (
  state = preloadedState || initialState,
  action,
) => {
  switch (action.type) {
    case LOAD_ARGUMENTS: {
      return { ...state,arguments:{...action.payload} };
    }
    
    default: {
      return state;
    }
  }
};
export default reducer;
