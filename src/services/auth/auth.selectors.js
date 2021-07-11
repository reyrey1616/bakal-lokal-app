import { createSelector } from "reselect";

const authSelector = (state) => state.auth;

export const selectAuthLoading = createSelector(
	[authSelector],
	(auth) => auth.loading
);

export const selectCurrentUser = createSelector([authSelector], (auth) => {
	return auth.user;
});

export const selectCurrentUserLoaded = createSelector(
	[authSelector],
	(auth) => !!auth.user
);

export const selectAuthentication = createSelector(
	[authSelector],
	(auth) => auth.isAuthenticated
);

export const selectDeliveryFee = createSelector(
	[authSelector],
	(auth) => auth.deliveryFee
);
export const selectDiscount = createSelector(
	[authSelector],
	(auth) => auth.discount
);
export const selectTransactionFee = createSelector(
	[authSelector],
	(auth) => auth.transactionFee
);
