import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";
import logger from "redux-logger";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const INITIAL_STATE = {};

// if (process.env.NODE_ENV === "production") {
// 	middlewares.push(logger);
// }

const store = createStore(
	rootReducer,
	INITIAL_STATE,
	applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

export default store;
