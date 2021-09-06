import React, { useState, useRef } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethodAction } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import Summary from '../components/Summary';
// import UserTextField from '../components/UserTextField';
// import PaymentForm from '../components/PaymentForm';

function PaymentScreen({ history }) {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push('/shipping');
	}

	const [paymentType, setPaymentType] = useState('PayPal');

	const dispatch = useDispatch();

	const checkoutStepsRef = useRef();
	// const userTextFieldRef = useRef();

	const previousHandler = () => {
		checkoutStepsRef.current.handleBack();
		history.push('/login?redirect=shipping');
	};

	const continueHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethodAction(paymentType));

		history.push('/placeorder');
	};

	return (
		<React.Fragment>
			<CheckoutSteps ref={checkoutStepsRef} stepsNumber={2} />
			<Row className='mb-3'>
				<Col md={{ span: 3, offset: 3 }}>
					<Card
						id='PayPal'
						name='PayPal'
						onClick={() => {
							setPaymentType('PayPal');
						}}
						className={`card-3d p-3 ${
							paymentType === 'PayPal' ? 'payment-background' : ''
						}`}
						style={{
							minHeight: '20vh',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<i className='fab fa-cc-paypal fa-5x'></i>
					</Card>
				</Col>
				<Col md={{ span: 4, offset: 2 }}>
					<Summary
						cart={cart}
						backHandler={previousHandler}
						nextHandler={continueHandler}
						backButtonName='Back'
						nextButtonName='Conitnue'
						isCheckout={true}
					/>
				</Col>
				{/* <Col md={{ span: 3, offset: 0 }}>
					<Card
						onClick={() => setPaymentType('Debit/Credit Card')}
						id='Debit/Credit Card'
						name='Debit/Credit Card'
						className={`card-3d p-3 ${
							paymentType === 'PayPal' ? '' : 'payment-background'
						}`}
						style={{
							minHeight: '20vh',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Row>
							<i className='far fa-credit-card fa-5x'></i>
						</Row>
						<Row>Debit/Credit Card</Row>
					</Card>
				</Col> */}
			</Row>
			{/* <Row>
				<Col md={{ span: 7, offset: 1 }}>
					<Row>
						{paymentType === 'Debit/Credit Card' && <PaymentForm />}
						<UserTextField
							ref={userTextFieldRef}
							header='Billing Address'
							isPaymentScreen={true}
						/>
					</Row>
				</Col>
				<Col md={4}>
					<Summary
						cart={cart}
						backHandler={previousHandler}
						nextHandler={continueHandler}
						backButtonName='Back'
						nextButtonName='Conitnue'
						isCheckout={true}
					/>
				</Col>
			</Row> */}
		</React.Fragment>
	);
}

export default PaymentScreen;
