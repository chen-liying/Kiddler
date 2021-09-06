import express from 'express';
import {
	addOrderItems,
	getOrderById,
	getMyOrders,
	getOrders,
	deleteOrder,
	updateOrderToDelivered,
} from '../controllers/orderController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
	.route('/')
	// @desc Create new order
	// @route POST /api/orders
	// @access Private
	.post(protect, addOrderItems)
	// @desc Get all orders
	// @route GET /api/orders
	// @access Private/Admin
	.get(protect, isAdmin, getOrders);

// @desc Get logged in user order
// @route GET /api/orders/myorders
// @access Private
router.route('/myorders').get(protect, getMyOrders);

router
	.route('/:id')
	// @desc Get order by ID
	// @route GET /api/orders/:id
	// @access Private
	.get(protect, getOrderById)
	// @desc Delete an order
	// @route DELETE /api/orders/:id
	// @access Private/Admin
	.delete(protect, isAdmin, deleteOrder);

// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered);

export default router;
