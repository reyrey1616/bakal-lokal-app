import ProductActionTypes from "./products.types";

export const getProductsStart = () => {
  return {
    type: ProductActionTypes.GET_PRODUCTS_START,
  };
};
export const getProductsSuccess = (payload) => {
  return {
    type: ProductActionTypes.GET_PRODUCTS_SUCCESS,
    payload,
  };
};

export const getProductsFail = (err) => {
  return {
    type: ProductActionTypes.GET_PRODUCTS_FAIL,
    payload: err,
  };
};

export const getNewArrivalProductsStart = () => {
  return {
    type: ProductActionTypes.GET_NEW_PRODUCTS_START,
  };
};
export const getNewArrivalProductsSuccess = (payload) => {
  return {
    type: ProductActionTypes.GET_NEW_PRODUCTS_SUCCESS,
    payload,
  };
};

export const getNewArrivalProductsFail = (err) => {
  return {
    type: ProductActionTypes.GET_NEW_PRODUCTS_FAIL,
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
    type: ProductActionTypes.GET_SALE_PRODUCTS_SUCCESS,
    payload,
  };
};

export const getProductsOnSaleFail = (err) => {
  return {
    type: ProductActionTypes.GET_SALE_PRODUCTS_FAIL,
    payload: err,
  };
};

export const getProductsByMerchantStart = (merchantId) => {
  return {
    type: ProductActionTypes.GET_PRODUCTS_BY_MERCHANT_START,
    merchantId,
  };
};
export const getProductsByMerchantSuccess = (payload) => {
  return {
    type: ProductActionTypes.GET_PRODUCTS_BY_MERCHANT_SUCCESS,
    payload,
  };
};

export const getProductsByMerchantFail = (err) => {
  return {
    type: ProductActionTypes.GET_PRODUCTS_BY_MERCHANT_FAIL,
    payload: err,
  };
};

// SEARCH PRODUCT
export const searchProductStart = (payload) => ({
  type: ProductActionTypes.SEARCH_PRODUCT_START,
  payload,
});
// SEARCH PRODUCT
export const searchProductSuccess = (payload) => ({
  type: ProductActionTypes.SEARCH_PRODUCT_SUCCESS,
  payload,
});
// SEARCH PRODUCT
export const searchProductFail = (payload) => ({
  type: ProductActionTypes.SEARCH_PRODUCT_FAIL,
  payload,
});
