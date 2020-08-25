import { LOAD_ARGUMENTS } from "./constants";

export const loadArguments = (payload) => {
  return {
    type: LOAD_ARGUMENTS,
    payload,
  };
};

