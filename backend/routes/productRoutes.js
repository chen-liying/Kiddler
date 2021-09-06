import express from 'express';
import {
	createProduct,
	createProductReview,
	deleteProduct,
	getProductById,
	getProducts,
	updateProduct,
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
	.route('/')
	// @desc Fetch all products
	// @route GET /api/products
	// @access Public
	.get(getProducts)
	// @desc Create a product
	// @route POST /api/products
	// @access Private/Admin
	.post(protect, isAdmin, createProduct);

// @desc Create new product review
// @route POST /api/products/:id/review
// @access Private	
router.route('/:id/review').post(protect, createProductReview);	

router
	.route('/:id')
	// @desc Update a product
	// @route PUT /api/products/:id
	// @access Private/Admin
	.put(protect, isAdmin, updateProduct)
	// @desc Fetch single product
	// @route GET /api/products/:id
	// @access Public
	.get(getProductById)
	// @desc Delete a product
	// @route DELETE /api/products/:id
	// @access Private/Admin
	.delete(protect, isAdmin, deleteProduct);

export default router;
