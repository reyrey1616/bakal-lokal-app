import AuthActionTypes from "./auth.types";
import { createReducer } from "../utils";
const INITIAL_STATE = {
	user: null,
	error: null,
	loading: false,
	token: null,
	isAuthenticated: false,
	isLoaded: false,
	deliveryFee: 0,
	discount: 0,
	transactionFee: 15,
};

const authLoading = (state) => {
	return {
		...state,
		loading: true,
		isLoaded: false,
	};
};

const authFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.payload,
		isAuthenticated: false,
	};
};

const login = (state, action) => {
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

const loadUser = (state, action) => {
	return {
		...state,
		loading: false,
		isAuthenticated: true,
		user: action.payload,
		token: action.payload?.token,
		isLoaded: true,
	};
};

const updateUser = (state, action) => {
	return {
		...state,
		loading: false,
		isAuthenticated: true,
		user: action.payload,
		isLoaded: true,
	};
};

const setDeliveryFee = (state, action) => {
	return {
		...state,
		deliveryFee: action.payload,
	};
};

const setDiscount = (state, action) => {
	return {
		...state,
		dicount: action.payload,
	};
};

const setTransactionFee = (state, action) => {
	return {
		...state,
		transactionFee: action.payload,
	};
};

export default createReducer(INITIAL_STATE, {
	[AuthActionTypes.LOGIN_START]: authLoading,
	[AuthActionTypes.LOGIN_SUCCESS]: login,
	[AuthActionTypes.LOGIN_FAIL]: authFail,

	[AuthActionTypes.UPDATE_CART_START]: authLoading,
	[AuthActionTypes.UPDATE_CART_SUCCESS]: updateUser,
	[AuthActionTypes.UPDATE_CART_FAIL]: authFail,

	[AuthActionTypes.REGISTER_START]: authLoading,
	[AuthActionTypes.REGISTER_SUCCESS]: register,
	[AuthActionTypes.REGISTER_FAIL]: authFail,

	[AuthActionTypes.GET_USER_START]: authLoading,
	[AuthActionTypes.GET_USER_SUCCESS]: loadUser,
	[AuthActionTypes.GET_USER_FAIL]: authFail,

	[AuthActionTypes.SET_DELIVERY_FEE]: setDeliveryFee,
	[AuthActionTypes.SET_DISCOUNT]: setDiscount,
	[AuthActionTypes.SET_TRANSACTION_FEE]: setTransactionFee,
});
