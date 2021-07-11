import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import {
	loginSuccess,
	loginFail,
	registerSuccess,
	registerFail,
	getUserSuccess,
	getUserFail,
	updateCartSuccess,
	updateCartFail,
} from "./auth.actions";
import { Alert } from "react-native";
import AuthActionTypes from "./auth.types";
import updateCartItem from "../../utils/updateCartItems";
import { asyncStoreRemove, asyncStoreSave } from "../utils";

function* signInAsync({ payload, callback }) {
	try {
		let loginRequest;
		let loginResponse;
		const loginCredentials = {
			email: payload?.email,
			password: payload?.password,
		};

		const url = `/auth/customer-login`;
		loginRequest = yield axios.post(url, loginCredentials);

		loginResponse = yield loginRequest.data;

		console.log(loginResponse);

		if (!loginRequest.token && loginResponse.error) {
			if (loginResponse.error === "Email not found") {
				Alert.alert("Email does not exists!");
			} else if (loginResponse.error === "Password not match") {
				Alert.alert("Password incorrect");
			}

			return;
		} else if (loginResponse.token) {
			yield put(
				loginSuccess({
					token: loginResponse?.token,
					user: loginResponse?.data,
				})
			);
			yield asyncStoreSave("token", loginResponse.token);
			yield callback(loginResponse.token);
		}
	} catch (error) {
		const errorResponse = error?.response?.data?.error;
		if (errorResponse) {
			yield put(loginFail(errorResponse));

			if (
				errorResponse.startsWith(
					"We sent you an email to verify your email address"
				)
			) {
				Alert.alert(
					"We sent you an email to verify your email address, Please verify your email first to Login your account"
				);
			} else {
				Alert.alert(errorResponse);
			}
		}
	}
}

function* signUpAsync({ payload, callback }) {
	try {
		// const { fname, mname, lname, email } = payload;
		// payload.isVerified = true;
		console.log(payload);

		const request = yield axios.post(
			"http://172.24.80.1:5000/api/v1/customers",
			payload
		);
		const response = yield request.data;
		if (response.success === true) {
			const id = response.otherResp[0];
			if (id) {
				// verificationEmail({
				// 	to_name: `${fname} ${
				// 		mname === undefined ? "" : mname
				// 	} ${lname}`,
				// 	email,
				// 	verification_link: `<a href = "https://bakal-lokal.com/customer-verification/${id}">Confirm Your Email</a>`,
				// });
			} else {
				throw Error;
			}
		} else {
			throw Error;
		}

		yield put(registerSuccess());
		callback();
	} catch (error) {
		if (error.response && error.response.data.error) {
			const errorResponse = error.response.data.error;
			yield put(registerFail(errorResponse));
			if (errorResponse === "Duplicate value entered") {
				Alert.alert("Email already exists, Please try another email.");
			} else {
				Alert.alert("Error on signing up. Please try again later!");
			}
		} else {
			yield put(registerFail(error.message));
			Alert.alert("Error on signing up. Please try again later!");
		}
	}
}

function* loadUserAsync({ callback }) {
	try {
		let request = yield axios.get(`/auth/get-customer`);
		let response = yield request.data;

		if (response.error && response.success === false) {
			yield asyncStoreRemove("token");
			return;
		} else if (response.success && response.data) {
			response.data.cartItems = updateCartItem(response.data);
			yield put(getUserSuccess(response?.data));
			yield callback(response?.data);
		}
	} catch (error) {
		const errorResponse = error?.response?.data?.error;
		if (errorResponse) {
			yield put(getUserFail(errorResponse));

			Alert.alert(
				"Something went wrong! Please login your account again."
			);
		}
	}
}

function* updateCartAsync({ payload, callback }) {
	try {
		const resp = yield axios.post(`/customers/cart`, {
			actionType: payload?.actionType,
			product: payload?.product,
			variant: payload?.variant,
			quantity: payload?.quantity,
			variant_id: payload?.variant_id,
			variantDetails: payload?.variantDetails,
		});

		const data = yield resp.data.data;

		data.cartItems = updateCartItem(data);

		yield put(updateCartSuccess(data));
		callback();
	} catch (error) {
		if (error.response && error.response.data.error) {
			const errorResponse = error.response.data.error;
			yield put(updateCartFail(errorResponse));
			Alert.alert("Bakal Lokal", errorResponse);
		} else {
			yield put(updateCartFail(error.message));
			Alert.alert(
				"Bakal Lokal",
				"Error executing action. Please try again later!"
			);
		}
	}
}

function* updateCartStart() {
	yield takeLatest(AuthActionTypes.UPDATE_CART_START, updateCartAsync);
}

function* loginStart() {
	yield takeLatest(AuthActionTypes.LOGIN_START, signInAsync);
}

function* registerStart() {
	yield takeLatest(AuthActionTypes.REGISTER_START, signUpAsync);
}

function* loadUserStart() {
	yield takeLatest(AuthActionTypes.GET_USER_START, loadUserAsync);
}

export default function* AuthSagas() {
	yield all([
		call(loginStart),
		call(loadUserStart),
		call(registerStart),
		call(updateCartStart),
	]);
}
