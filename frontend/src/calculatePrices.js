export const addDecimals = (num) => {
	return (Math.round(num * 100) / 100).toFixed(2);
};

export const calculatePrices = (cart) => {
	const itemsPrice = Number(
		addDecimals(
			cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		)
	);
	const shippingPrice = itemsPrice > 100 ? 0 : 25;

	const taxPrice = Number(addDecimals(0.06 * itemsPrice));

	const totalPrice = itemsPrice + shippingPrice + taxPrice;

	return {
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	};
};
