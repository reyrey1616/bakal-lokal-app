import { createSelector } from "reselect";

const productsSelector = (state) => state.products;

export const selectLoading = createSelector(
	[productsSelector],
	(prod) => prod.loading
);

export const selectSaleProducts = createSelector(
	[productsSelector],
	(prod) => prod.saleProducts
);

export const selectPublicProducts = createSelector(
	[productsSelector],
	(prod) => {
		return shuffle(prod.products);
	}
);

export const selectPublicSaleProducts = createSelector(
	[productsSelector],
	(prod) => {
		console.log(prod);
		return shuffle(prod.onSaleProducts);
	}
);

function shuffle(array) {
	let i = array && array.length;
	while (i--) {
		const ri = Math.floor(Math.random() * (i + 1));
		[array[i], array[ri]] = [array[ri], array[i]];
	}
	return array;
}
