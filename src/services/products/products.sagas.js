import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import {
	getProductsFail,
	getProductsSuccess,
	getProductsOnSaleSuccess,
	getProductsOnSaleFail,
} from "./products.actions";
import { Alert } from "react-native";
import ProductActionTypes from "./products.types";

function* getProductsAsync() {
	try {
		const request = yield axios.get(
			"/products/?adminApproval=Approved&postStatus=Published"
		);
		let response = yield request?.data?.data;

		response.forEach((m) => {
			m.categoryArray = m.categories.map((c) => c.slug);
		});

		yield put(getProductsSuccess(response));
	} catch (error) {
		const errorResponse = error?.response?.data?.error;

		if (errorResponse) {
			yield put(getProductsFail(errorResponse));
			Alert.alert(errorResponse);
		} else {
			yield put(getProductsFail(errorResponse));
			Alert.alert("Error loading products!");
		}
	}
}

function* getOnSaleProductsAsync() {
	try {
		const request = yield axios.get(`/products/sale`);
		let response = yield request?.data?.data;

		response.forEach((m) => {
			m.categoryArray = m.categories.map((c) => c.slug);
		});

		yield put(getProductsOnSaleSuccess(response));
	} catch (error) {
		const errorResponse = error?.response?.data?.error;

		if (errorResponse) {
			yield put(getProductsOnSaleFail(errorResponse));
			Alert.alert(errorResponse);
		} else {
			yield put(getProductsOnSaleFail(errorResponse));
			Alert.alert("Error loading products on sale!");
		}
	}
}

function* getProductsStart() {
	yield takeLatest(ProductActionTypes.GET_PRODUCTS_START, getProductsAsync);
}

function* getProductsOnSaleStart() {
	yield takeLatest(
		ProductActionTypes.GET_SALE_PRODUCTS_START,
		getOnSaleProductsAsync
	);
}

export default function* ProductSagas() {
	yield all([call(getProductsStart), call(getProductsOnSaleStart)]);
}
