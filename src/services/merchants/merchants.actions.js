import MerchantActionTypes from "./merchants.types";

export const getMerchantsStart = () => {
	return {
		type: MerchantActionTypes.GET_MERCHANTS_START,
	};
};
export const getMerchantsSuccess = (payload) => {
	return {
		type: MerchantActionTypes.GET_MERCHANTS_SUCCESS,
		payload,
	};
};

export const getMerchantsFail = (err) => {
	return {
		type: MerchantActionTypes.GET_MERCHANTS_FAIL,
		payload: err,
	};
};

export const getOneMerchantsStart = () => {
	return {
		type: MerchantActionTypes.GET_ONE_MERCHANT_START,
	};
};
export const getOneMerchantsSuccess = (payload) => {
	return {
		type: MerchantActionTypes.GET_ONE_MERCHANT_SUCCESS,
		payload,
	};
};

export const getOneMerchantsFail = (err) => {
	return {
		type: MerchantActionTypes.GET_ONE_MERCHANT_FAIL,
		payload: err,
	};
};

export const setCurrentMerchant = (payload) => {
	return {
		type: MerchantActionTypes.SET_CURRENT_MERCHANT,
		payload,
	};
};
