import { all, call } from "@redux-saga/core/effects";
import AuthSagas from "./auth/auth.sagas";

export default function* rootSaga() {
	yield all([call(AuthSagas)]);
}
