import { createSelector } from "reselect";

const merchantsSelector = (state) => state.merchants;

export const selectLoading = createSelector(
	[merchantsSelector],
	(merchant) => merchant.loading
);

export const selectMerchants = createSelector(
	[merchantsSelector],
	(merchant) => merchant.merchants
);

export const selectOneMerchant = createSelector(
	[merchantsSelector],
	(merchant) => merchant.currentMerchant
);
