import { createSelector } from "reselect";

const categoriesSelector = (state) => state.categories;

export const selectLoading = createSelector(
	[categoriesSelector],
	(cat) => cat.loading
);

export const selectCategories = createSelector(
	[categoriesSelector],
	(cat) => cat.categories
);
