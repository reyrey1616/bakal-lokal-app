import { all, call } from "@redux-saga/core/effects";

import ProductSagas from "./products/products.sagas";
import CategoriesSagas from "./category/category.sagas";
import MerchantSagas from "./merchants/merchants.sagas";
export default function* rootSaga() {
	yield all([call(ProductSagas), call(CategoriesSagas), call(MerchantSagas)]);
}
