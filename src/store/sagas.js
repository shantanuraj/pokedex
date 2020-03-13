import {
  all,
  call,
  takeEvery,
  put,
  take,
  cancelled,
  race
} from "redux-saga/effects";
import { apiRequestSuccess } from "./actions";

function* watchApiActions() {
  yield takeEvery('API_REQUEST', performApiRequest);
}

const cancelAction = key => action => (
  action.type === 'API_REQUEST_CANCEL' &&
  action.payload.key === key
);

function* performApiRequest (action) {
  const { key, url } = action.payload;
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const { response, cancel } = yield race({
      response: call(fetch, url, { signal }),
      cancel: take(cancelAction(key))
    })

    if (cancel) return controller.abort();

    const data = yield response.json();
    yield put(apiRequestSuccess(key, data));
  } finally {
    if (yield cancelled()) controller.abort();
  }
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([call(watchApiActions)]);
}
