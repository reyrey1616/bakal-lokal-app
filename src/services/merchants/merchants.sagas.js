import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import {
	getMerchantsSuccess,
	getMerchantsFail,
	getOneMerchantsSuccess,
	getOneMerchantsFail,
} from "./merchants.actions";
import { Alert } from "react-native";
import MerchantActionTypes from "./merchants.types";

function* getMerchantsAsync() {
	try {
		const request = yield axios.get("/merchants/?status=Active");
		let response = yield request?.data?.data;
		yield put(getMerchantsSuccess(response));
	} catch (error) {
		const errorResponse = error?.response?.data?.error;

		if (errorResponse) {
			yield put(getMerchantsFail(errorResponse));
			Alert.alert(errorResponse);
		} else {
			yield put(getMerchantsFail(errorResponse));
			Alert.alert("Error loading shops!");
		}
	}
}

function* getOneMerchantsAsync({ id }) {
	try {
		const request = yield axios.get(`/merchants/${id}`);
		let response = yield request?.data?.data;
		yield put(getOneMerchantsSuccess(response));
	} catch (error) {
		const errorResponse = error?.response?.data?.error;

		if (errorResponse) {
			yield put(getOneMerchantsFail(errorResponse));
			Alert.alert(errorResponse);
		} else {
			yield put(getOneMerchantsFail(errorResponse));
			Alert.alert("Error loading shop!");
		}
	}
}

function* getMerchantsStart() {
	yield takeLatest(
		MerchantActionTypes.GET_MERCHANTS_START,
		getMerchantsAsync
	);
}

function* getOneMerchantsStart() {
	yield takeLatest(
		MerchantActionTypes.GET_ONE_MERCHANT_START,
		getOneMerchantsAsync
	);
}

export default function* MerchantSagas() {
	yield all([call(getMerchantsStart), call(getOneMerchantsStart)]);
}
