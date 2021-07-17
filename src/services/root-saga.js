import { all, call } from "@redux-saga/core/effects";
import AuthSagas from "./auth/auth.sagas";
import ProductSagas from "./products/products.sagas";
import MerchantSagas from "./merchants/merchants.sagas";
import CategoriesSagas from "./category/category.sagas";
export default function* rootSaga() {
	yield all([
		call(AuthSagas),
		call(ProductSagas),
		call(MerchantSagas),
		call(CategoriesSagas),
	]);
}
