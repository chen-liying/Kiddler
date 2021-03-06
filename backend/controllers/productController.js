import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 10;

	const page = Number(req.query.pageNumber) || 1;

	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i', // case insensitive
				},
		  }
		: {};

	const count = await Product.countDocuments({ ...keyword });

	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample Name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.png',
		brand: 'Sample Brand',
		category: 'Sample Category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample Discription',
	});

	const createdProduct = await product.save();

	res.status(201).json(createdProduct);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, brand, category, countInStock } =
		req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		(product.description = description), (product.image = image);
		(product.category = category), (product.countInStock = countInStock);

		const updatedProduct = await product.save();

		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product NOT FOUND!');
	}
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();

		res.json({ message: `Product ${req.params.id} REMOVED!` });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc Create new product review
// @route POST /api/products/:id/review
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		const alreadyReviewed = product.reviews.find(
			(review) => review.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewed) {
			res.status(400);
			throw new Error('Product already reviewed');
		}

		const review = {
			firstName: req.user.firstName,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);

		product.numReviews = product.reviews.length;

		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();

		res.status(201).json({ message: 'Review ADDED!' });
	} else {
		res.status(404);
		throw new Error('Product NOT FOUND!');
	}
});

export {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	createProductReview,
};
