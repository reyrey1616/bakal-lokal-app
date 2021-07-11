import { createSelector } from "reselect";

const authSelector = (state) => state.auth;

export const selectAuthLoading = createSelector(
	[authSelector],
	(auth) => auth.loading
);

export const selectCurrentUser = createSelector([authSelector], (auth) => {
	console.log(auth.user);

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
