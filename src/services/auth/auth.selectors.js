import { createSelector } from "reselect";

const authSelector = (state) => state.auth;

export const selectAuthState = createSelector([authSelector], (auth) => auth);

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

export const selectVoucher = createSelector(
	[authSelector],
	(auth) => auth.voucher
);
export const selectTransactionFee = createSelector(
	[authSelector],
	(auth) => auth.transactionFee
);

export const selectDeliveryDetails = createSelector(
	[authSelector],
	(auth) => auth.deliveryDetails
);

export const selectOrders = createSelector(
	[authSelector],
	(auth) => auth.orders
);

export const selectOrdersLoading = createSelector(
	[authSelector],
	(auth) => auth.ordersLoading
);
