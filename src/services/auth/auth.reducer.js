import AuthActionTypes from "./auth.types";
import { createReducer } from "../utils";
import moment from "moment";
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
	deliveryDetails: {
		deliveryOption: "Pick-up",
		date: moment(new Date(Date.now())).format("YYYY-MM-DD"),
		time: moment(),
		fullAddress: "",
		baranggay: "",
		city: "",
		province: "",
		postcode: "",
		paymentMethod: "Cash on Delivery",
		selectedVoucher: null,
		logistic: "Lihog",
		lat: null,
		lng: null,
		distance: null,
	},
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
	console.log(action.payload);
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

const setVoucher = (state, action) => {
	const voucher = action?.payload;
	console.log(voucher?.discount);
	return {
		...state,
		discount: voucher?.discount,
		voucher,
	};
};

const setTransactionFee = (state, action) => {
	return {
		...state,
		transactionFee: action.payload,
	};
};

const setDeliveryDetails = (state, action) => {
	return {
		...state,
		deliveryDetails: action.payload,
	};
};

const setDeliveryLocation = (state, action) => {
	const { lat, lng, distance } = action.payload;

	return {
		...state,
		loading: false,
		// user: { ...state.user, lat, lng, distance },
		deliveryDetails: { ...state?.deliveryDetails, lat, lng, distance },
	};
};

const orderSuccess = (state, action) => {
	return {
		...state,
		loading: false,
		deliveryFee: 0,
		discount: 0,
		voucher: null,
		transactionFee: 15,
		deliveryDetails: {
			deliveryOption: "Pick-up",
			date: moment(new Date(Date.now())).format("YYYY-MM-DD"),
			time: moment(),
			fullAddress: "",
			baranggay: "",
			city: "",
			province: "",
			postcode: "",
			paymentMethod: null,
			selectedVoucher: null,
			logistic: null,
			lat: null,
			lng: null,
			distance: null,
		},
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

	[AuthActionTypes.ADD_ORDER_START]: authLoading,
	[AuthActionTypes.ADD_ORDER_SUCCESS]: orderSuccess,
	[AuthActionTypes.ADD_ORDER_FAIL]: authFail,

	[AuthActionTypes.SET_DELIVERY_FEE]: setDeliveryFee,
	[AuthActionTypes.SET_VOUCHER]: setVoucher,
	[AuthActionTypes.SET_TRANSACTION_FEE]: setTransactionFee,
	[AuthActionTypes.SET_DELIVERY_DETAILS]: setDeliveryDetails,
	[AuthActionTypes.SET_DELIVERY_LOCATION]: setDeliveryLocation,

	[AuthActionTypes.UPDATE_CUSTOMER_INFO_START]: authLoading,
	[AuthActionTypes.UPDATE_CUSTOMER_INFO_SUCCESS]: updateUser,
	[AuthActionTypes.UPDATE_CUSTOMER_INFO_FAIL]: authFail,
});
