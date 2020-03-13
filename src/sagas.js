import { all, call, take, put } from "redux-saga/effects";
import { apiRequestSuccess } from "./reducers";

export function* watchApiActions() {
  while (true) {
    const action = yield take("API_REQUEST");
    const { key, url } = action.payload;
    const response = yield call(fetch, url);
    const data = yield response.json();
    yield put(apiRequestSuccess(key, data));
  }
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([call(watchApiActions)]);
}
