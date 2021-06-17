import ProductActionTypes from "./products.types";

export const getProductsStart = () => {
	return {
		type: ProductActionTypes.GET_PRODUCTS_START,
	};
};
export const getProductsSuccess = (payload) => {
	return {
		type: ProductActionTypes.GET_PRODUCTS_START,
		payload,
	};
};

export const getProductsFail = (err) => {
	return {
		type: ProductActionTypes.GET_PRODUCTS_START,
		payload: err,
	};
};

export const getProductsOnSaleStart = () => {
	return {
		type: ProductActionTypes.GET_SALE_PRODUCTS_START,
	};
};
export const getProductsOnSaleSuccess = (payload) => {
	return {
		type: ProductActionTypes.GET_SALE_PRODUCTS_START,
		payload,
	};
};

export const getProductsOnSaleFail = (err) => {
	return {
		type: ProductActionTypes.GET_SALE_PRODUCTS_START,
		payload: err,
	};
};
