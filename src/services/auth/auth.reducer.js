import AuthActionTypes from "./category.types";
import { createReducer } from "../utils";
import { asyncStoreRemove, asyncStoreSave } from "../utils";
const INITIAL_STATE = {
	user: null,
	error: null,
	loading: false,
	token: null,
	isAuthenticated: false,
};

const authLoading = (state) => {
	return {
		...state,
		loading: true,
	};
};

const authFail = async (state, action) => {
	await asyncStoreRemove("token");

	return {
		...state,
		loading: false,
		error: action.payload,
		isAuthenticated: false,
	};
};

const login = async (state, action) => {
	await asyncStoreSave("token", action?.payload?.token);
	return {
		...state,
		loading: false,
		user: action.payload?.user,
		token: action.payload?.token,
		error: null,
		isAuthenticated: true,
	};
};

const register = (state) => {
	return {
		...state,
		loading: false,
		error: null,
	};
};

const getUser = async (state, action) => {
	await asyncStoreSave("token", action?.payload?.token);

	return {
		...state,
		loading: false,
		user: action.payload?.user,
		token: action.payload?.token,
		error: null,
		isAuthenticated: true,
	};
};

export default createReducer(INITIAL_STATE, {
	[AuthActionTypes.LOGIN_START]: authLoading,
	[AuthActionTypes.LOGIN_SUCCESS]: login,
	[AuthActionTypes.LOGIN_FAIL]: authFail,

	[AuthActionTypes.REGISTER_START]: authLoading,
	[AuthActionTypes.REGISTER_SUCCESS]: register,
	[AuthActionTypes.REGISTER_FAIL]: authFail,

	[AuthActionTypes.GET_USER_START]: authLoading,
	[AuthActionTypes.GET_USER_SUCCESS]: getUser,
	[AuthActionTypes.GET_USER_FAIL]: authFail,
});
