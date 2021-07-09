import AuthActionTypes from "./auth.types";
import { Alert } from "react-native";
export const loginStart = (payload, callback) => {
	return {
		type: AuthActionTypes.LOGIN_START,
		payload,
		callback,
	};
};
export const loginSuccess = (payload) => {
	return {
		type: AuthActionTypes.LOGIN_START,
		payload,
	};
};

export const loginFail = (err) => {
	return {
		type: AuthActionTypes.LOGIN_START,
		payload: err,
	};
};

export const registerStart = (payload, callback) => {
	return {
		type: AuthActionTypes.REGISTER_START,
		payload,
		callback,
	};
};
export const registerSuccess = (payload) => {
	return {
		type: AuthActionTypes.REGISTER_START,
		payload,
	};
};

export const registerFail = (err) => {
	return {
		type: AuthActionTypes.REGISTER_START,
		payload: err,
	};
};

export const getUserStart = () => {
	return {
		type: AuthActionTypes.GET_USER_START,
	};
};
export const getUserSuccess = (payload) => {
	return {
		type: AuthActionTypes.GET_USER_START,
		payload,
	};
};

export const getUserFail = (err) => {
	return {
		type: AuthActionTypes.GET_USER_START,
		payload: err,
	};
};
