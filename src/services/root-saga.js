import { all, call } from "@redux-saga/core/effects";
import AuthSagas from "./auth/auth.sagas";
import ProductSagas from "./products/products.sagas";

export default function* rootSaga() {
	yield all([call(AuthSagas), call(ProductSagas)]);
}
