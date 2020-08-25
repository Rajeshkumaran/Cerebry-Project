import { put, takeEvery, all } from "redux-saga/effects";
import { loadArguments } from "./actions";
export function* homeSaga(params = {}) {
  try {
    console.log("debugger saga params->", params);
    yield put(loadArguments({ ...params }));
  } catch (err) {
    console.log("Caught in getMessage", err);
  }
}
export const homeSagas = [];
