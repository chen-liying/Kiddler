import React, { useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import CheckoutSteps from '../components/CheckoutSteps';
import Summary from '../components/Summary';
import OrderDetails from '../components/OrderDetails';
import { placeOrder } from '../placeorder';
import { removeAllFromCartAction } from '../actions/cartActions';

function PlaceOrderScreen({ history }) {
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);

	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, success } = orderCreate;

	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`);

			dispatch(removeAllFromCartAction());
			dispatch({ type: USER_DETAILS_RESET });
			dispatch({ type: ORDER_CREATE_RESET });
		}

		// eslint-disable-next-line
	}, [history, success]);

	const child = useRef();

	const previousHandler = () => {
		child.current.handleBack();
		history.push('/payment');
	};

	const placeOrderHandler = () => {
		placeOrder(dispatch, cart);
	};

	return (
		<React.Fragment>
			<CheckoutSteps ref={child} stepsNumber={3} />
			<Row>
				<Col md={1}></Col>
				<Col md={7}>
					<OrderDetails />
				</Col>
				<Col md={4}>
					<Summary
						cart={cart}
						backHandler={previousHandler}
						nextHandler={placeOrderHandler}
						backButtonName='Back'
						nextButtonName='PlaceOrder'
						isCheckout={true}
						paymentMethod={cart.paymentMethod}
					/>
				</Col>
			</Row>
		</React.Fragment>
	);
}

export default PlaceOrderScreen;
