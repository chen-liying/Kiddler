import { createOrderAction } from './actions/orderActions';
import { calculatePrices } from './calculatePrices';
import { ORDER_PAY_RESET } from './constants/orderConstants';

function addDays(theDate, days) {
	return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
}

export const placeOrder = (dispatch, cart) => {
	const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
		calculatePrices(cart);

	const today = new Date();
	console.log(today);

	dispatch(
		createOrderAction({
			orderItems: cart.cartItems,
			shippingAddress: cart.shippingAddress,
			paymentMethod: cart.paymentMethod,
			itemsPrice: itemsPrice,
			shippingPrice: shippingPrice,
			taxPrice: taxPrice,
			totalPrice: totalPrice,
			isPaid: true,
			paidAt: today,
			deliveredAt: addDays(today, 5),
		})
	);

	dispatch({ type: ORDER_PAY_RESET });
};
