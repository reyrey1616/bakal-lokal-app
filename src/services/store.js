import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, sagaMiddleware];
const INITIAL_STATE = {};
const store = createStore(
	rootReducer,
	INITIAL_STATE,
	applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);
export default store;
