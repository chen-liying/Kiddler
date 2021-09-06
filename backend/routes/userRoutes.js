import express from 'express';
import {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	getUserById,
	editUserInfo,
	deleteUser,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc Authorize user & get token
// @route POST /api/users/login
// @access Public
router.post('/login', authUser);

router
	.route('/')
	// @desc Register a new user
	// @route POST /api/users
	// @access Public
	.post(registerUser)
	// @desc Get all users
	// @route GET /api/users
	// @access Private/Admin
	.get(protect, isAdmin, getUsers);

// @desc Get/Put user profile
// @route GET /api/users/profile
//		  PUT /api/users/profile
// @access Private
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

router
	.route('/:id')
	// @desc Delete a user
	// @route DELETE /api/users/:id
	// @access Private/Admin
	.delete(protect, deleteUser)
	// @desc Get user by ID
	// @route GET /api/users/:id
	// @access Private/Admin
	.get(protect, getUserById)
	// @desc Update user info
	// @route PUT /api/users/:id
	// @access Private/Admin
	.put(protect, editUserInfo);

export default router;
