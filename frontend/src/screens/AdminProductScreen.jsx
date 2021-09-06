import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import {
	createProductAction,
	deleteProductAction,
	productListAction,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

function AdminProductScreen({ history, match }) {
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingProductCreate,
		error: errorProductCreate,
		success: isProductCreated,
		product: createdProduct,
	} = productCreate;

	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingProductDelete,
		error: errorProductDelete,
		success: isProductDeleted,
	} = productDelete;

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });

		if (!userInfo || !userInfo.isAdmin) {
			history.push('/login');
		}

		if (isProductCreated) {
			history.push(`/admin/product/${createdProduct._id}/edit`);
		} else {
			dispatch(productListAction('', pageNumber));
		}
	}, [
		dispatch,
		userInfo,
		history,
		isProductDeleted,
		isProductCreated,
		createdProduct,
		pageNumber,
	]);

	const deleteHandler = (productId) => {
		if (window.confirm('Are user sure?')) {
			dispatch(deleteProductAction(productId));
		}
	};

	const createProductHandler = (product) => {
		dispatch(createProductAction());
	};

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createProductHandler}>
						<i className='fas fa-plus'></i> Create Product
					</Button>
				</Col>
			</Row>
			{(loadingProductDelete || loadingProductCreate) && <Loader />}
			{(errorProductDelete || errorProductCreate) && (
				<Message variant='danger'>
					{errorProductDelete || errorProductCreate}
				</Message>
			)}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products &&
								products.map((product) => (
									<tr key={product._id}>
										<td>{product._id}</td>
										<td>{product.name}</td>
										<td>${product.price}</td>
										<td>{product.category}</td>
										<td>{product.brand}</td>
										<td>
											<LinkContainer to={`/admin/product/${product._id}/edit`}>
												<Button variant='light' className='btn-sm'>
													<i className='fas fa-edit'></i>
												</Button>
											</LinkContainer>
											<Button
												variant='danger'
												className='btn-sm'
												onClick={() => deleteHandler(product._id)}
											>
												<i className='fas fa-trash'></i>
											</Button>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
					<Paginate pages={pages} page={page} isAdmin={true}></Paginate>
				</>
			)}
		</>
	);
}

export default AdminProductScreen;
