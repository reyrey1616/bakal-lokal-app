import CategoryActionTypes from "./category.types";
import { createReducer } from "../utils";

const INITIAL_STATE = {
	categories: [],
	error: null,
	loading: false,
};

const categoriesLoading = (state) => {
	return {
		...state,
		loading: true,
	};
};

const categoriesFail = (state, action) => {
	return {
		...state,
		loading: false,
		error: action.payload,
	};
};

const getCategories = (state, action) => {
	return {
		...state,
		loading: false,
		categories: action.payload,
		error: null,
	};
};

export default createReducer(INITIAL_STATE, {
	[CategoryActionTypes.GET_CATEGORIES_START]: categoriesLoading,
	[CategoryActionTypes.GET_CATEGORIES_SUCCESS]: getCategories,
	[CategoryActionTypes.GET_CATEGORIES_FAIL]: categoriesFail,
});
