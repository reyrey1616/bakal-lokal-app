import CategoryActionTypes from "./category.types";

export const getCategoriesStart = () => {
	return {
		type: CategoryActionTypes.GET_CATEGORIES_START,
	};
};
export const getCategoriesSuccess = (payload) => {
	return {
		type: CategoryActionTypes.GET_CATEGORIES_SUCCESS,
		payload,
	};
};

export const getCategoriesFail = (err) => {
	return {
		type: CategoryActionTypes.GET_CATEGORIES_FAIL,
		payload: err,
	};
};
