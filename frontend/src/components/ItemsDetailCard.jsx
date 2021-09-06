import React from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
import TruckSummary from './TruckSummary';

function ItemsDetailCard({ header, items }) {
	return (
		<React.Fragment>
			<Card className='mb-3'>
				<Card.Header className='card-header'>{header}</Card.Header>
				<Card.Body>
					<TruckSummary cartItems={items} />
					{items.map((item, index) => (
						<Row className='ml-1 py-1' key={index}>
							<Col md={2}>
								<Image src={item.image} alt={item.name} fluid rounded />
							</Col>
							<Col md={10}>
								<Row>
									<Card.Text className='card-text-bold'>{item.name}</Card.Text>
								</Row>
								<Row>
									<Card.Text className='card-text-grey'>
										Qty: {item.qty}
									</Card.Text>
								</Row>
								<Row className='align-self-end card-text-bold'>
									<Col md={10}></Col>
									<Col md={2}>${item.qty * item.price}</Col>
								</Row>
							</Col>
						</Row>
					))}
				</Card.Body>
			</Card>
		</React.Fragment>
	);
}

export default ItemsDetailCard;
