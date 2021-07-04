function currencyFormat(x) {
	const int = parseFloat(x)
		.toFixed(2)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return `₱${int}`;
}

export default currencyFormat;
