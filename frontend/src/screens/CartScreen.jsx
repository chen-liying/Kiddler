import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction, removeFromCartAction } from '../actions/cartActions';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import Summary from '../components/Summary';
import TruckSummary from '../components/TruckSummary';

function CartScreen({ history }) {
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCartAction(id));
	};

	const checkoutHandler = () => {
		history.push('/login?redirect=shipping');
	};

	const continueShoppingHandler = () => {
		history.push('/');
	};

	return (
		<Row>
			<CheckoutSteps />
			<Col md={8}>
				<p>
					<span className='screen-header'>My Bag</span> <br />
					<TruckSummary cartItems={cartItems} />
				</p>
				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty <Link to='/'>Go Back</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((item) => {
							return (
								<ListGroup.Item key={item.product}>
									<Row>
										<Col md={2}>
											<Image src={item.image} alt={item.name} fluid rounded />
										</Col>
										<Col md={3}>
											<Link to={`/product/${item.product}`}>{item.name}</Link>
										</Col>
										<Col md={2}>${item.price}</Col>
										<Col md={2}>
											<Form.Control
												as='select'
												value={item.qty}
												onChange={(e) =>
													dispatch(
														addToCartAction(
															item.product,
															Number(e.target.value)
														)
													)
												}
											>
												{[...Array(item.countInStock).keys()].map((x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</Form.Control>
										</Col>
										<Col md={2}>
											<Button
												type='button'
												variant='light'
												onClick={() => removeFromCartHandler(item.product)}
											>
												<i className='fas fa-trash'></i>
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							);
						})}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Summary
					cart={cart}
					backHandler={checkoutHandler}
					nextHandler={continueShoppingHandler}
					backButtonName='Checkout'
					nextButtonName='Continue Shopping'
				/>
			</Col>
		</Row>
	);
}

export default CartScreen;
