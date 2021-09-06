import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
	deleteOrderAction,
	listAllOrdersAction,
} from '../actions/orderActions';

function AdminOrderScreen({ history, match }) {
	const dispatch = useDispatch();

	const orderListAll = useSelector((state) => state.orderListAll);
	const { loading, error, orders } = orderListAll;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const orderDelete = useSelector((state) => state.orderDelete);
	const {
		loading: loadingOrderDelete,
		error: errorOrderDelete,
		success: isOrderDeleted,
	} = orderDelete;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listAllOrdersAction());
		} else {
			history.push('/login');
		}
	}, [dispatch, userInfo, history, isOrderDeleted]);

	const deleteHandler = (orderId) => {
		if (window.confirm('Are user sure?')) {
			dispatch(deleteOrderAction(orderId));
		}
	};

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Orders</h1>
				</Col>
			</Row>
			{loadingOrderDelete && <Loader />}
			{errorOrderDelete && (
				<Message variant='danger'>{errorOrderDelete}</Message>
			)}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders &&
							orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.user._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>${order.totalPrice}</td>
									<td style={{ textAlign: 'center' }}>
										{order.isPaid ? (
											<i
												className='fas fa-check'
												style={{ color: 'green' }}
											></i>
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td style={{ textAlign: 'center' }}>
										{order.isDelivered ? (
											<i
												className='fas fa-check'
												style={{ color: 'green' }}
											></i>
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button variant='light' className='btn-sm'>
												Details
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => deleteHandler(order._id)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			)}
		</>
	);
}

export default AdminOrderScreen;
