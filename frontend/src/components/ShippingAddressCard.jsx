import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Card } from 'react-bootstrap';

function ShippingAddressCard() {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	return (
		<React.Fragment>
			<Card className='mb-3'>
				<Card.Header className='card-header'>Shipping Address</Card.Header>
				<Card.Body>
					<Row className='ml-1 py-1'>
						<Card.Text>
							{shippingAddress.firstName} {shippingAddress.lastName}
						</Card.Text>
					</Row>
					<Row className='ml-1 py-1'>
						<Card.Text>{shippingAddress.address}</Card.Text>
					</Row>
					<Row className='ml-1 py-1'>
						<Card.Text>
							{shippingAddress.city}
							{','}
							{shippingAddress.state} {shippingAddress.postalCode}
						</Card.Text>
					</Row>
				</Card.Body>
			</Card>
		</React.Fragment>
	);
}

export default ShippingAddressCard;
