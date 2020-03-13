import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const getStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
  ));
  sagaMiddleware.run(rootSaga);
  return store;
};
