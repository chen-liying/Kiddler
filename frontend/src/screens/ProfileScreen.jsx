import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
	getUserDetailsAction,
	updateUserProfileAction,
} from '../actions/userActions';
import { listProfileOrdersAction } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

function ProfileScreen({ location, history }) {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	const orderListProfile = useSelector((state) => state.orderListProfile);
	const {
		loading: loadingOrderList,
		error: errorOrderList,
		orders: orderList,
	} = orderListProfile;

	useEffect(() => {
		if (!userInfo) {
			history.push(`/login`);
		} else {
			if (!user || !user.firstName || success) {
				dispatch({ type: USER_UPDATE_PROFILE_RESET });
				dispatch(getUserDetailsAction('profile'));
				dispatch(listProfileOrdersAction());
			} else {
				setFirstName(user.firstName);
				setLastName(user.lastName);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, userInfo, user, success]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage('Password do not match');
		} else {
			dispatch(
				updateUserProfileAction({
					id: user._id,
					firstName,
					lastName,
					email,
					password,
				})
			);
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{message && <Message variant='danger'>{message} </Message>}
				{error && <Message variant='danger'>{error} </Message>}
				{success && <Message variant='success'> Profile Updated</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='firstname'>
						<Form.Label>FirstName</Form.Label>
						<Form.Control
							type='firstname'
							placeholder='Enter Firstname'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='confirmPassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Confirm password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Button type='submit' variant='primary'>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Order</h2>
				{loadingOrderList ? (
					<Loader />
				) : errorOrderList ? (
					<Message variant='danger'>{errorOrderList}</Message>
				) : (
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orderList &&
								orderList.map((order) => (
									<tr key={order._id}>
										<td>{order._id}</td>
										<td>{order.createdAt.substring(0, 10)}</td>
										<td>{order.totalPrice}</td>
										<td>
											{order.isPaid ? (
												<i
													className='fas fa-check'
													style={{ color: 'green' }}
												></i>
											) : (
												<i
													className='fas fa-times'
													style={{ color: 'red' }}
												></i>
											)}
										</td>
										<td>
											{order.isDelivered ? (
												order.deliveredAt.substring(0, 10)
											) : (
												<i
													className='fas fa-times'
													style={{ color: 'red' }}
												></i>
											)}
										</td>
										<td>
											<LinkContainer to={`/order/${order._id}`}>
												<Button className='btn-sm' variant='light'>
													Details
												</Button>
											</LinkContainer>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
}

export default ProfileScreen;
