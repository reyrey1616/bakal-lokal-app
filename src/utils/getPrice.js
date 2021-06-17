const identifyPricing = (data) => {
	if (data) {
		const { onSale, saleDetails } = data;
		if (data && onSale === true) {
			if (saleDetails && saleDetails) {
				const endDate = new Date(saleDetails.saleEndDate);
				const currentDate = new Date();
				if (currentDate.getTime() < endDate.getTime()) {
					return data && saleDetails.salePrice;
				} else {
					return data && data.srp;
				}
			}
		} else {
			return data && data.srp;
		}
	}
};

export default identifyPricing;
