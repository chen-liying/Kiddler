import React, { useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddressAction } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import Summary from '../components/Summary';
import UserTextField from '../components/UserTextField';

function ShippingScreen({ history }) {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const checkoutStepsRef = useRef();
	const userTextFieldRef = useRef();

	const previousHandler = () => {
		checkoutStepsRef.current.handleBack();
		history.push('/cart');
	};

	const continueHandler = (e) => {
		e.preventDefault();
		const { firstName, lastName, address, city, state, postalCode, country } =
			userTextFieldRef.current.getUserInfo();
		dispatch(
			saveShippingAddressAction({
				firstName,
				lastName,
				address,
				city,
				state,
				postalCode,
				country,
			})
		);

		history.push('/payment');
	};

	return (
		<Row>
			<CheckoutSteps
				ref={checkoutStepsRef}
				stepsNumber={1}
				previousHandler={previousHandler}
			/>
			<Col md={1}></Col>
			<Col md={7}>
				<UserTextField ref={userTextFieldRef} header='Shipping Address' />
			</Col>
			<Col md={4}>
				<Summary
					cart={cart}
					backHandler={previousHandler}
					nextHandler={continueHandler}
					backButtonName='Back'
					nextButtonName='Conitnue'
				/>
			</Col>
		</Row>
	);
}

export default ShippingScreen;
