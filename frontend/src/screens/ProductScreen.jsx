import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
	createProductReviewAction,
	productDetailsAction,
} from '../actions/productActions';
import { addToCartAction } from '../actions/cartActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

function ProductScreen({ history, match }) {
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productCreateReview = useSelector((state) => state.productCreateReview);
	const { success: successCreateReview, error: errorCreateReview } =
		productCreateReview;

	useEffect(() => {
		if (successCreateReview) {
			alert('Review Submitted!');
			setRating(0);
			setComment('');
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}

		dispatch(productDetailsAction(match.params.id));
	}, [dispatch, match, successCreateReview]);

	const addToCartHandler = () => {
		dispatch(addToCartAction(match.params.id, qty));
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			createProductReviewAction(match.params.id, {
				rating,
				comment,
			})
		);
	};

	return (
		<div>
			<Link className='btn btn-light my-3' to='/'>
				<i className='fas fa-chevron-left'> Go Back</i>
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'></Message>
			) : (
				<>
					<Row>
						{/*The first m-auto in the Col tag makes the image center vertically, 
                   i.e. distances to the top and bottom are equal.
                   The second mx-auto in the img tag makes the image center horizontally, 
                   i.e. distances to the left and right are equal.

                   d-block in img tag is essential because by default image is displayed 
                   as inline block. 
                   
                   img-fluid keeps the image inside the container.
                   */}
						<Col md={4} className='m-auto'>
							<Image
								className='d-block mx-auto img-fluid w-70'
								src={product.image}
								alt={product.name}
							/>
						</Col>
						<Col md={5}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										id={product.id}
										rating={product.rating}
										numReviews={product.numReviews}
									/>
								</ListGroup.Item>
								<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
								<ListGroup.Item>
									Description: {product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Price:</Col>
											<Col>${product.price}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
											</Col>
										</Row>
									</ListGroup.Item>
									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
												<Col>
													<Form.Control
														as='select'
														value={qty}
														onChange={(e) => setQty(e.target.value)}
													>
														{[...Array(product.countInStock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															)
														)}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}
									<ListGroup.Item>
										<Button
											className='btn-block'
											type='button'
											disabled={product.countInStock === 0}
											onClick={addToCartHandler}
										>
											Add To Cart
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews.length === 0 && <Message>No Reviews</Message>}
							<ListGroup variant='flush'>
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating rating={review.rating} />
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Write a Customer Review</h2>
									{errorCreateReview && (
										<Message variant='danger'>{errorCreateReview}</Message>
									)}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId='rating'>
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as='select'
													value={rating}
													onChange={(e) => setRating(e.target.value)}
												>
													<option value=''>Select...</option>
													<option value='1'>1-Poor</option>
													<option value='2'>2-Fair</option>
													<option value='3'>3-Good</option>
													<option value='4'>4-Very Good</option>
													<option value='5'>5-Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId='comment'>
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as='textarea'
													row='3'
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>
											<Button type='submit' variant='primary'>
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to='/login'>Sign in</Link> to write a review
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</div>
	);
}

export default ProductScreen;
