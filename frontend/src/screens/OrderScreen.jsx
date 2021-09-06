import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetailsAction } from '../actions/orderActions';
import ItemsDetailCard from '../components/ItemsDetailCard';

function OrderScreen({ match, history }) {
	const orderId = match.params.id;

	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails);
	//const { order, loading, error } = orderDetails;
	const { order } = orderDetails;

	//console.log(order);

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	//const orderDeliver = useSelector((state) => state.orderDeliver);
	//const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

	function convertDate(order) {
		const date = new Date(order.deliveredAt);

		return date.toDateString().substring(0, 10);
	}

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		}

		if (!order || order._id !== orderId) {
			dispatch(getOrderDetailsAction(orderId));
		}
	}, [history, userInfo, dispatch, order, orderId]);

	//const adminDeliverHandler = () => {
	//dispatch(deliverOrderAction(order));
	//};

	return (
		<React.Fragment>
			{order && (
				<Row>
					<Col md={1}></Col>
					<Col>
						<span className='screen-header'>Order Summary</span> <br />
						<p style={{ fontWeight: 'bold' }}> Order# {orderId} </p>
						<Card className='mb-3'>
							<Card.Body>
								<Card.Title
									style={{
										color: 'orange',
										fontWeight: 'bold',
										fontSize: '20px',
									}}
								>
									Hello Customer,
								</Card.Title>
								<Card.Text>
									Thank you for placing order with us. Your order is being
									processed and will be shipped shortly. Your estimated delivery
									date is indicate below. If you would like to cancel your order
									or mak any changes to it, please reach our customer service:
									+1 (800) 888-8888.
								</Card.Text>
							</Card.Body>
							<Card.Body style={{ background: 'lightgrey' }}>
								<Row>
									<Col md={6}>
										<span style={{ fontWeight: 'bold' }}>
											Estimated Shipping Date:
										</span>
										<br />
										<span style={{ color: 'forestgreen', fontWeight: 'bold' }}>
											{convertDate(order)}
										</span>
									</Col>
									<Col md={6}>
										<span style={{ fontWeight: 'bold' }}>
											Your order will be sent to:{' '}
										</span>
										<br />
										<span>
											{order.shippingAddress.firstName}{' '}
											{order.shippingAddress.lastName}
											<br />
											{order.shippingAddress.address} <br />
											{order.shippingAddress.city},{' '}
											{order.shippingAddress.state}{' '}
											{order.shippingAddress.postalCode}
										</span>
									</Col>
								</Row>
							</Card.Body>
						</Card>
						<ItemsDetailCard header='Ordered Items' items={order.orderItems} />
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<Row>
									<Col md={6}>
										<p className='float-right' style={{ fontWeight: 'bold' }}>
											Items Subtotal
										</p>
									</Col>
									<Col>
										<p className='float-right'>${order.itemsPrice}</p>
									</Col>
								</Row>
								<Row>
									<Col md={6}>
										<p className='float-right' style={{ fontWeight: 'bold' }}>
											Shipping & Handing
										</p>
									</Col>
									<Col>
										<p className='float-right'>${order.shippingPrice}</p>
									</Col>
								</Row>
								<Row>
									<Col md={6}>
										<p className='float-right' style={{ fontWeight: 'bold' }}>
											Taxes
										</p>
									</Col>
									<Col>
										<p className='float-right'>${order.taxPrice}</p>
									</Col>
								</Row>
								<Row>
									<Col md={6}>
										<p className='float-right' style={{ fontWeight: 'bold' }}>
											Order Total
										</p>
									</Col>
									<Col>
										<p className='float-right'>${order.totalPrice}</p>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item></ListGroup.Item>
						</ListGroup>
						You will get the tracking number once items are shipped.
						<br />
						<br />
						Keep shopping with us &#128512;
						<br />
						Thank you!
					</Col>
					<Col md={1}></Col>
				</Row>
			)}
		</React.Fragment>
	);

	// return loading ? (
	// 	<Loader />
	// ) : error ? (
	// 	<Message variant='danger'>{error}</Message>
	// ) : (
	// 	<>
	// 		<h1>Order Confirmation</h1>
	// 		<h1> Order Number: {orderId} </h1>
	// 		<Row>
	// 			<Col md={8}>
	// 				<ListGroup variant='flush'>
	// 					<ListGroup.Item>
	// 						<h2>Shipping</h2>
	// 						<p>
	// 							<strong>Name: </strong> {order.user.firstName}{' '}
	// 							{order.user.lastName}
	// 							<br />
	// 							<strong>Email: </strong>
	// 							<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
	// 							<br />
	// 							<strong>Address: </strong>
	// 							{order.shippingAddress.address}, {order.shippingAddress.city}{' '}
	// 							{order.shippingAddress.postalCode}{' '}
	// 							{order.shippingAddress.country}
	// 						</p>
	// 						{order.isDelivered ? (
	// 							<Message variant='success'>
	// 								Delivered on {order.deliveredAt}
	// 							</Message>
	// 						) : (
	// 							<Message variant='danger'>Not Delivered</Message>
	// 						)}
	// 					</ListGroup.Item>
	// 					<ListGroup.Item>
	// 						<h2>Payment</h2>
	// 						<p>
	// 							<strong>Method: </strong>
	// 							{order.paymentMethod}
	// 						</p>
	// 						{order.isPaid ? (
	// 							<Message variant='success'>Paid on {order.paidAt}</Message>
	// 						) : (
	// 							<Message variant='danger'>Not Paid</Message>
	// 						)}
	// 					</ListGroup.Item>
	// 					<ListGroup.Item>
	// 						<h2>Order Details</h2>
	// 						{order.orderItems.length === 0 ? (
	// 							<Message>Order is EMPTY!</Message>
	// 						) : (
	// 							<ListGroup variant='flush'>
	// 								{order.orderItems.map((item, index) => (
	// 									<ListGroup.Item key={index}>
	// 										<Row>
	// 											<Col md={1}>
	// 												<Image
	// 													src={item.image}
	// 													alt={item.name}
	// 													fluid
	// 													rounded
	// 												/>
	// 											</Col>
	// 											<Col>
	// 												<Link to={`/product/${item.product}`}>
	// 													{item.name}
	// 												</Link>
	// 											</Col>
	// 											<Col md={4}>
	// 												{item.qty} x ${item.price} = ${item.qty * item.price}
	// 											</Col>
	// 										</Row>
	// 									</ListGroup.Item>
	// 								))}
	// 							</ListGroup>
	// 						)}
	// 					</ListGroup.Item>
	// 				</ListGroup>
	// 			</Col>
	// 			<Col md={4}>
	// 				<Card>
	// 					<ListGroup variant='flush'>
	// 						<ListGroup.Item>
	// 							<h2>Order Summary</h2>
	// 						</ListGroup.Item>
	// 						<ListGroup.Item>
	// 							<Row>
	// 								<Col>Items</Col>
	// 								<Col>${order.itemsPrice}</Col>
	// 							</Row>
	// 						</ListGroup.Item>
	// 						<ListGroup.Item>
	// 							<Row>
	// 								<Col>Shipping</Col>
	// 								<Col>${order.shippingPrice}</Col>
	// 							</Row>
	// 						</ListGroup.Item>
	// 						<ListGroup.Item>
	// 							<Row>
	// 								<Col>Tax</Col>
	// 								<Col>${order.taxPrice}</Col>
	// 							</Row>
	// 						</ListGroup.Item>
	// 						<ListGroup.Item>
	// 							<Row>
	// 								<Col>Total</Col>
	// 								<Col>${order.totalPrice}</Col>
	// 							</Row>
	// 						</ListGroup.Item>
	// 					</ListGroup>
	// 					{loadingDeliver && <Loader />}
	// 					{!order.isPaid && (
	// 						<ListGroup.Item>
	// 							{loadingPay && <Loader />}
	// 							{!sdkReady ? (
	// 								<Loader />
	// 							) : (
	// 								<PayPalButton
	// 									amount={order.totalPrice}
	// 									onSuccess={paypalButtonHandler}
	// 								/>
	// 							)}
	// 						</ListGroup.Item>
	// 					)}
	// 					{userInfo &&
	// 						userInfo.isAdmin &&
	// 						order.isPaid &&
	// 						!order.isDelivered && (
	// 							<ListGroup.Item>
	// 								<Button
	// 									type='button'
	// 									className='btn btn-block'
	// 									onClick={adminDeliverHandler}
	// 								>
	// 									Mark As Delivered
	// 								</Button>
	// 							</ListGroup.Item>
	// 						)}
	// 				</Card>
	// 			</Col>
	// 		</Row>
	// 	</>
	//);
}

export default OrderScreen;
