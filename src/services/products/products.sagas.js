import {
	all,
	call,
	put,
	takeLatest,
	takeEvery,
} from "@redux-saga/core/effects";
import axios from "axios";
import {
	getProductsFail,
	getProductsSuccess,
	getProductsOnSaleSuccess,
	getProductsOnSaleFail,
	getProductsByMerchantSuccess,
	getProductsByMerchantFail,
	searchProductSuccess,
	searchProductFail,
	getNewArrivalProductsFail,
	getNewArrivalProductsSuccess,
} from "./products.actions";
import { Alert } from "react-native";
import ProductActionTypes from "./products.types";

function* getProductsAsync() {
	try {
		const request = yield axios.get(
			"/products/?adminApproval=Approved&postStatus=Published&limit=10"
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
		}
	}
}

function* getNewArrivalProductsAsync() {
	try {
		const request = yield axios.get(
			"/products/?adminApproval=Approved&postStatus=Published&limit=10"
		);
		let response = yield request?.data?.data;
		response.forEach((m) => {
			m.categoryArray = m.categories.map((c) => c.slug);
		});

		yield put(getNewArrivalProductsSuccess(response));
	} catch (error) {
		const errorResponse = error?.response?.data?.error;

		if (errorResponse) {
			yield put(getNewArrivalProductsFail(errorResponse));
			Alert.alert(errorResponse);
		}
	}
}

function* getProductsByMerchantAsync({ merchantId }) {
	try {
		console.log(merchantId);
		const request = yield axios.get(
			`/merchants/${merchantId}/all-products`
		);
		let response = yield request?.data?.data;
		response.forEach((m) => {
			m.categoryArray = m.categories.map((c) => c.slug);
		});

		yield put(getProductsByMerchantSuccess(response));
	} catch (error) {
		const errorResponse = error?.response?.data?.error;

		if (errorResponse) {
			yield put(getProductsByMerchantFail(errorResponse));
			Alert.alert(errorResponse);
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

function* getNewArrivalProductsStart() {
	yield takeLatest(
		ProductActionTypes.GET_NEW_PRODUCTS_START,
		getNewArrivalProductsAsync
	);
}

function* getProductsOnSaleStart() {
	yield takeLatest(
		ProductActionTypes.GET_SALE_PRODUCTS_START,
		getOnSaleProductsAsync
	);
}

function* getProductsByMerchant() {
	yield takeLatest(
		ProductActionTypes.GET_PRODUCTS_BY_MERCHANT_START,
		getProductsByMerchantAsync
	);
}

export default function* AuthSagas() {
	yield all([
		call(getProductsStart),
		call(getNewArrivalProductsStart),
		call(getProductsByMerchant),
		call(getProductsOnSaleStart),
	]);
}
