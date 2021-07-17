import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import { getCategoriesSuccess, getCategoriesFail } from "./category.actions";
import { Alert } from "react-native";
import CategoriesActionTypes from "./category.types";

function* getCategoriesAsync() {
	try {
		const request = yield axios.get("/categories/advanced");
		let response = yield request?.data?.data;
		yield put(getCategoriesSuccess(response));
	} catch (error) {
		const errorResponse = error?.response?.data?.error;

		if (errorResponse) {
			yield put(getCategoriesFail(errorResponse));
			Alert.alert(errorResponse);
		} else {
			yield put(getCategoriesFail(errorResponse));
			Alert.alert("Error loading categories!");
		}
	}
}

function* getCategoriesStart() {
	yield takeLatest(
		CategoriesActionTypes.GET_CATEGORIES_START,
		getCategoriesAsync
	);
}

export default function* CategoriesSagas() {
	yield all([call(getCategoriesStart)]);
}
