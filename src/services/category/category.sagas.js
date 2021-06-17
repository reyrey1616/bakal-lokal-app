import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import { getCategoriesSuccess, getCategoriesFail } from "./category.actions";
import { Alert } from "react-native";
import CategoriesActionTypes from "./category.types";

function* getCategoriesAsync() {
	try {
		const request = yield axios.get("/categories");
		let response = yield request?.data?.data;
		const filteredData = response.filter((d) => d.status === true);
		yield put(getCategoriesSuccess(filteredData));
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
	return all([call(getCategoriesStart)]);
}
