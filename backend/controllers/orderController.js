import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		isPaid,
		paidAt,
		paymentResult,
		deliveredAt,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No Order Items');
	} else {
		const order = new Order({
			user: req.user._id,
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
			isPaid,
			paidAt,
			paymentResult,
			deliveredAt,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	);

	if (order) {
		if (req.user.isAdmin || order.user._id.equals(req.user._id)) {
			res.json(order);
		} else {
			res.status(401);
			throw new Error('NOT Authorized');
		}
	} else {
		res.status(400);
		throw new Error('Order NOT FOUND!');
	}
});

// @desc Get logged in user order
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });

	res.json(orders);
});

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate('user', 'id name');

	res.json(orders);
});

// @desc Delete an order
// @route DELETE /api/orders/:id
// @access Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (order) {
		await order.remove();

		res.json({ message: `Order ${req.params.id} REMOVED!` });
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @desc Update order to Delivered
// @route GET /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();

		const updatedOrder = await order.save();

		res.json({ updatedOrder });
	} else {
		res.status(404);
		throw new Error('Order NOT FOUND!');
	}
});

export {
	addOrderItems,
	getOrderById,
	updateOrderToDelivered,
	getMyOrders,
	getOrders,
	deleteOrder,
};
