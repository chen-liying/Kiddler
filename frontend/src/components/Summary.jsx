import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { calculatePrices } from '../calculatePrices';
import PayPal from '../components/PayPal';

function Summary({
	cart,
	backHandler,
	nextHandler,
	backButtonName,
	nextButtonName,
	isCheckout,
	paymentMethod,
}) {
	const { itemsPrice, shippingPrice, totalPrice, taxPrice } =
		calculatePrices(cart);
	return (
		<Card>
			<Card.Header className='order-summary-header'>Order Summary</Card.Header>
			<Card.Body>
				<Row className='py-1'>
					<Col md={8}>
						<Card.Text> Subtotal </Card.Text>
					</Col>
					<Col md={4}>${itemsPrice}</Col>
				</Row>
				<Row className='py-1'>
					<Col md={8}>
						<Card.Text> Shippings </Card.Text>
					</Col>
					<Col md={4}>${shippingPrice}</Col>
				</Row>
				{isCheckout && (
					<Row className='py-1'>
						<Col md={8}>
							<Card.Text> Tax </Card.Text>
						</Col>
						<Col md={4}>${taxPrice}</Col>
					</Row>
				)}

				<Row className='py-1'>
					<Col md={8}>
						<Card.Title style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
							{' '}
							Estimate Total{' '}
						</Card.Title>
					</Col>
					<Col md={4}>${isCheckout ? totalPrice : totalPrice - taxPrice}</Col>
				</Row>

				{!isCheckout && (
					<Card.Text style={{ fontSize: '0.8rem', color: 'grey' }}>
						Tax and shipping calculated in checkout
					</Card.Text>
				)}
				<Button
					type='button'
					className='btn-block'
					disabled={cart.cartItems.length === 0}
					onClick={backHandler}
				>
					{backButtonName}
				</Button>
				{paymentMethod === 'PayPal' ? (
					<PayPal totalPrice={totalPrice} placeOrder={nextHandler} />
				) : (
					<Button type='button' className='btn-block' onClick={nextHandler}>
						{nextButtonName}
					</Button>
				)}
			</Card.Body>
		</Card>
	);
}

export default Summary;
