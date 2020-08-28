import { put, takeEvery, all } from "redux-saga/effects";
import { loadArguments } from "./actions";
import { checkParamsExist, isValidPythagorasInputs } from "../../utils/helpers";
export function* homeSaga(params = {}) {
  try {
    console.log("debugger saga params->", params);

    const isValidParams = checkParamsExist(params);
    console.log("debugger 1", isValidParams);

    if (!isValidParams) {
      yield put(loadArguments({ ...params, isParamsError: true }));
      return;
    }
    const validArguments = isValidPythagorasInputs(params);
    console.log("validArguments", validArguments);
    const { isValid, args, newlyComputed } = validArguments || {};
    const { A, B, C } = args;
    const roundedA = Math.floor(A);
    const roundedB = Math.floor(B);
    const roundedC = Math.floor(C);
    if (isValid) {
      yield put(
        loadArguments({
          ...params,
          roundedA,
          roundedB,
          roundedC,
          isParamsError: false,
          newlyComputed,
        }),
      );
      console.log("debugger 2", isValidParams);
    } else {
      yield put(
        loadArguments({
          ...args,
          roundedA,
          roundedB,
          roundedC,
          isParamsError: false,
          newlyComputed,
        }),
      );
      console.log("debugger 3", isValidParams);
    }
  } catch (err) {
    console.log("Caught in getMessage", err);
  }
}
export const homeSagas = [];
