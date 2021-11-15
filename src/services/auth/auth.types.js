const AuthActionTypes = {
	LOGIN_START: "LOGIN_START",
	LOGIN_SUCCESS: "LOGIN_SUCCESS",
	LOGIN_FAIL: "LOGIN_FAIL",

	REGISTER_START: "REGISTER_START",
	REGISTER_SUCCESS: "REGISTER_SUCCESS",
	REGISTER_FAIL: "REGISTER_FAIL",

	UPDATE_CART_START: "UPDATE_CART_START",
	UPDATE_CART_FAIL: "UPDATE_CART_FAIL",
	UPDATE_CART_SUCCESS: "UPDATE_CART_SUCCESS",

	GET_USER_START: "GET_USER_START",
	GET_USER_SUCCESS: "GET_USER_SUCCESS",
	GET_USER_FAIL: "GET_USER_FAIL",

	SET_DELIVERY_FEE: "SET_DELIVERY_FEE",
	SET_VOUCHER: "SET_VOUCHER",
	SET_TRANSACTION_FEE: "SET_TRANSACTION_FEE",
	SET_DELIVERY_DETAILS: "SET_DELIVERY_DETAILS",

	ADD_ORDER_START: "ADD_ORDER_START",
	ADD_ORDER_SUCCESS: "ADD_ORDER_SUCCESS",
	ADD_ORDER_FAIL: "ADD_ORDER_FAIL",

	SET_DELIVERY_LOCATION: "SET_DELIVERY_LOCATION",

	UPDATE_CUSTOMER_INFO_START: "UPDATE_CUSTOMER_INFO_START",
	UPDATE_CUSTOMER_INFO_FAIL: "UPDATE_CUSTOMER_INFO_FAIL",
	UPDATE_CUSTOMER_INFO_SUCCESS: "UPDATE_CUSTOMER_INFO_SUCCESS",

	GET_ORDER_START: "GET_ORDER_START",
	GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS",
	GET_ORDER_FAIL: "GET_ORDER_FAIL",

	LOGOUT: "LOGOUT",
};

export default AuthActionTypes;
