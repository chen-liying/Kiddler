import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
	productDetailsAction,
	updateProductAction,
} from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

function ProductEditScreen({ match, history }) {
	const productId = match.params.id;

	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState('');
	const [description, setDescription] = useState('');
	const [isUploading, setIsUploading] = useState(false);

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productUpdate = useSelector((state) => state.productUpdate);
	const {
		loading: productUpdateLoading,
		error: productUpdateError,
		success: productUpdateSuccess,
	} = productUpdate;

	useEffect(() => {
		if (productUpdateSuccess) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			history.push('/admin/productlist');
		} else {
			if (!product.name || product._id !== productId) {
				dispatch(productDetailsAction(productId));
			} else {
				setName(product.name);
				setPrice(product.price);
				setImage(product.image);
				setBrand(product.brand);
				setCategory(product.category);
				setCountInStock(product.countInStock);
				setDescription(product.description);
			}
		}
	}, [dispatch, history, productId, product, productUpdateSuccess]);

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];

		const formData = new FormData();

		formData.append('image', file);

		setIsUploading(true);

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};

			const { data } = await axios.post('/api/uploads', formData, config);

			setImage(data);
			setIsUploading(false);
		} catch (error) {
			console.error(error);
			setIsUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();

		const product = {
			_id: productId,
			name,
			price,
			image,
			brand,
			category,
			description,
			countInStock,
		};

		dispatch(updateProductAction(product));
	};

	return (
		<>
			<Link to='/admin/productlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{productUpdateLoading && <Loader />}
				{productUpdateError && (
					<Message variant='danger'>{productUpdateError}</Message>
				)}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error} </Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='description'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Description'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='price'>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter price'
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='image'>
							<Form.Label>Image</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter image url'
								value={image}
								onChange={(e) => setImage(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.File
							id='image-file'
							label='Choose file'
							custom
							onChange={uploadFileHandler}
						>
							{isUploading && <Loader />}
						</Form.File>
						<Form.Group controlId='brand'>
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Brand'
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='countInStock'>
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter number in stock'
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='Category'>
							<Form.Label>Category</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Category'
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
}

export default ProductEditScreen;
