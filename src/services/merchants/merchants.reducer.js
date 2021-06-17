import MerchantActionTypes from "./merchants.types";
import { createReducer } from "../utils";

const INITIAL_STATE = {
	merchants: [],
	currentMerchant: null,
	error: null,
	loading: false,
};

const merchantLoading = (state) => {
	return {
		...state,
		loading: true,
	};
};

const merchantFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.payload,
	};
};

const getMerchants = (state, action) => {
	return {
		...state,
		loading: false,
		merchants: action.payload,
		error: null,
	};
};

const getOneMerchant = (state, action) => {
	return {
		...state,
		loading: false,
		currentMerchant: action.payload,
		error: null,
	};
};

export default createReducer(INITIAL_STATE, {
	[MerchantActionTypes.GET_MERCHANTS_START]: merchantLoading,
	[MerchantActionTypes.GET_MERCHANTS_SUCCESS]: getMerchants,
	[MerchantActionTypes.GET_MERCHANTS_FAIL]: merchantFail,

	[MerchantActionTypes.GET_ONE_MERCHANT_START]: merchantLoading,
	[MerchantActionTypes.GET_ONE_MERCHANT_SUCCESS]: getOneMerchant,
	[MerchantActionTypes.GET_ONE_MERCHANT_FAIL]: merchantFail,
});
