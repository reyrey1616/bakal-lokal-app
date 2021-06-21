import identifyPricing from "./getPrice";

const updateCartItem = (data) => {
	const updatedCartItem =
		data.cartItems &&
		data.cartItems.map((item) => {
			if (item && item.variant) {
				const updatedItem = item.product.variations.filter(
					(i) =>
						i.name.trim().toString().toLowerCase() ===
						item.variant.trim().toString().toLowerCase()
				);

				return {
					...item,
					subTotal: identifyPricing(updatedItem[0]) * item.quantity,
					buyPrice: identifyPricing(updatedItem[0]),
				};
			} else {
				return {
					...item,
					subTotal: identifyPricing(item.product) * item.quantity,
					buyPrice: identifyPricing(item.product),
				};
			}
		});

	return updatedCartItem;
};

export default updateCartItem;
