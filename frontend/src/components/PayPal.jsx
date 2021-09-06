import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';

function PayPal({ totalPrice, placeOrder }) {
	//let order = null;
	const [isPaid, setIsPaid] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [isPayPalButton, setPayPalButton] = useState(false);
	let paypalRef = useRef();

	// Dynamically adding the paypal sdk script
	const addPayPalScript = async () => {
		const { data: clientId } = await axios.get('/api/config/paypal');

		const script = document.createElement('script');

		script.type = 'text/javascript';
		script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&disable-funding=credit,card`;
		script.async = true;

		script.onload = () => {
			setLoaded(true);
		};

		document.body.appendChild(script);
	};

	const addPayPalButton = useCallback(
		(totalPrice) => {
			if (!isPayPalButton) {
				window.paypal
					.Buttons({
						createOrder: (data, actions) => {
							return actions.order.create({
								intent: 'CAPTURE',
								purchase_units: [
									{
										// description: 'Your description',
										amount: {
											value: totalPrice,
										},
									},
								],
							});
						},
						onApprove: async (data, actions) => {
							//order = await actions.order.capture();
							setIsPaid(true);
							//console.log('PayPal order: ', order);
						},
						onError: (err) => {
							//   setError(err),
							console.error(err);
						},
					})
					.render(paypalRef.current);

				setPayPalButton(true);
			}
		},
		[isPayPalButton]
	);

	const triggerPlaceOrder = useCallback(() => {
		if (isPaid) {
			placeOrder();
			setIsPaid(false);
		}
	}, [isPaid, placeOrder]);

	useEffect(() => {
		if (!loaded) {
			addPayPalScript();
		} else {
			addPayPalButton(totalPrice);
		}

		triggerPlaceOrder();
	}, [loaded, addPayPalButton, totalPrice, triggerPlaceOrder]);

	return (
		<div className='py-1'>
			<div ref={paypalRef} />
		</div>
	);
}

export default PayPal;
