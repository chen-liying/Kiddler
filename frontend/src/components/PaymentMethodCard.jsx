import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

function PaymentMethodCard() {
	const cart = useSelector((state) => state.cart);

	return (
		<React.Fragment>
			<Card className='mb-3'>
				<Card.Header className='card-header'>Payment Method</Card.Header>
				<Card.Body>
					{cart.paymentMethod === 'PayPal' ? (
						<i className='fab fa-cc-paypal fa-5x'></i>
					) : (
						<i className='far fa-credit-card fa-5x'></i>
					)}
				</Card.Body>
			</Card>
		</React.Fragment>
	);
}

export default PaymentMethodCard;
