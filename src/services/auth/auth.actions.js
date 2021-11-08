import AuthActionTypes from "./auth.types";
export const loginStart = (payload, callback) => {
	return {
		type: AuthActionTypes.LOGIN_START,
		payload,
		callback,
	};
};
export const loginSuccess = (payload) => {
	return {
		type: AuthActionTypes.LOGIN_SUCCESS,
		payload,
	};
};

export const loginFail = (err) => {
	return {
		type: AuthActionTypes.LOGIN_FAIL,
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
		type: AuthActionTypes.REGISTER_SUCCESS,
		payload,
	};
};

export const registerFail = (err) => {
	return {
		type: AuthActionTypes.REGISTER_FAIL,
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
		type: AuthActionTypes.GET_USER_SUCCESS,
		payload,
	};
};

export const getUserFail = (err) => {
	return {
		type: AuthActionTypes.GET_USER_FAIL,
		payload: err,
	};
};

// UPDATE CART
export const updateCartStart = ({ payload, callback = () => {} }) => {
	return {
		type: AuthActionTypes.UPDATE_CART_START,
		payload,
		callback,
	};
};

export const updateCartSuccess = (payload) => {
	return {
		type: AuthActionTypes.UPDATE_CART_SUCCESS,
		payload,
	};
};

export const updateCartFail = (payload) => {
	return {
		type: AuthActionTypes.UPDATE_CART_FAIL,
		payload,
	};
};

export const setDeliveryFee = (payload) => {
	return {
		type: AuthActionTypes.SET_DELIVERY_FEE,
		payload,
	};
};

export const setStoreVoucher = (payload) => {
	return {
		type: AuthActionTypes.SET_VOUCHER,
		payload,
	};
};

export const setTransactionFee = (payload) => {
	return {
		type: AuthActionTypes.SET_TRANSACTION_FEE,
		payload,
	};
};

export const setDeliveryDetails = (payload) => {
	return {
		type: AuthActionTypes.SET_DELIVERY_DETAILS,
		payload,
	};
};

// ADD ORDER @CUSTOMER
export const addOrderStart = ({ payload, callback }) => {
	return {
		type: AuthActionTypes.ADD_ORDER_START,
		payload,
		callback,
	};
};

export const addOrderSuccess = (payload) => {
	return {
		type: AuthActionTypes.ADD_ORDER_SUCCESS,
		payload,
	};
};

export const addOrderFail = (payload) => {
	return {
		type: AuthActionTypes.ADD_ORDER_FAIL,
		payload,
	};
};

export const setDeliveryLocation = (payload) => {
	return {
		type: AuthActionTypes.SET_DELIVERY_LOCATION,
		payload,
	};
};

// UPDATE CUSTOMER INFO
export const updateCustomerInfoStart = ({ payload, callback = () => {} }) => {
	console.log(payload);
	return {
		type: AuthActionTypes.UPDATE_CUSTOMER_INFO_START,
		payload,
		callback,
	};
};

export const updateCustomerInfoSuccess = (payload) => {
	return {
		type: AuthActionTypes.UPDATE_CUSTOMER_INFO_SUCCESS,
		payload,
	};
};

export const updateCustomerInfoFail = (payload) => {
	return {
		type: AuthActionTypes.UPDATE_CUSTOMER_INFO_FAIL,
		payload,
	};
};

export const getAllOrderStart = (customerId) => {
	return {
		type: AuthActionTypes.GET_ORDER_START,
		customer: customerId,
	};
};

export const getAllOrderSuccess = (payload) => {
	return {
		type: AuthActionTypes.GET_ORDER_SUCCESS,
		payload,
	};
};

export const getAllOrderFail = (payload) => {
	return {
		type: AuthActionTypes.GET_ORDER_FAIL,
		payload,
	};
};
