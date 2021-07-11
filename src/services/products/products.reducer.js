import ProductActionTypes from "./products.types";
import { createReducer } from "../utils";
import { Alert } from "react-native";

const INITIAL_STATE = {
	products: [],
	onSaleProducts: [],
	currentProduct: null,
	error: null,
	loading: false,
};

const productsLoading = (state) => {
	return {
		...state,
		loading: true,
	};
};

const productsFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.payload,
	};
};

const getSaleProducts = (state, action) => {
	return {
		...state,
		loading: false,
		saleProducts: action.payload,
		error: action.payload,
	};
};

const getProducts = (state, action) => {
	return {
		...state,
		loading: false,
		products: action.payload,
		error: null,
	};
};

const getProductsByMerchant = (state, action) => {
	return {
		...state,
		loading: false,
		products: action.payload,
		error: null,
	};
};

export default createReducer(INITIAL_STATE, {
	[ProductActionTypes.GET_PRODUCTS_START]: productsLoading,
	[ProductActionTypes.GET_PRODUCTS_SUCCESS]: getProducts,
	[ProductActionTypes.GET_PRODUCTS_FAIL]: productsFail,

	[ProductActionTypes.GET_SALE_PRODUCTS_START]: productsLoading,
	[ProductActionTypes.GET_SALE_PRODUCTS_SUCCESS]: getSaleProducts,
	[ProductActionTypes.GET_SALE_PRODUCTS_FAIL]: productsFail,

	[ProductActionTypes.GET_PRODUCTS_BY_MERCHANT_START]: productsLoading,
	[ProductActionTypes.GET_PRODUCTS_BY_MERCHANT_SUCCESS]: getProductsByMerchant,
	[ProductActionTypes.GET_PRODUCTS_BY_MERCHANT_FAIL]: productsFail,
});
