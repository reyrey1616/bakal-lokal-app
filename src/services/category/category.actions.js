import CategoryActionTypes from "./category.types";

export const getCategoriesStart = () => {
	return {
		type: CategoryActionTypes.GET_CATEGORY_START,
	};
};
export const getCategoriesSuccess = (payload) => {
	return {
		type: CategoryActionTypes.GET_CATEGORY_START,
		payload,
	};
};

export const getCategoriesFail = (err) => {
	return {
		type: CategoryActionTypes.GET_CATEGORY_START,
		payload: err,
	};
};
