import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Authorize user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	//res.send({ email, password });

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400); // Bad Request
		throw new Error('User already exists');
	}

	const user = await User.create({
		firstName,
		lastName,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.firstName = req.body.firstName || user.firstName;
		user.lastName = req.body.lastName || user.lastName;

		user.email = req.body.email || user.email;

		if (req.body.password) {
			user.password = req.body.password;
		}

		const updateUser = await user.save();

		res.json({
			_id: updateUser._id,
			firstName: updateUser.firstName,
			lastName: updateUser.lastName,
			email: updateUser.email,
			isAdmin: updateUser.isAdmin,
			token: generateToken(updateUser._id),
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});

	res.json(users);
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password');

	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc Edit user info
// @route PUT /api/users/:id
// @access Private/Admin
const editUserInfo = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		user.firstName = req.body.firstName || user.firstName;
		user.lastName = req.body.lastName || user.lastName;

		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin || user.isAdmin;

		const updateUser = await user.save();

		res.json({
			_id: updateUser._id,
			firstName: updateUser.firstName,
			lastName: updateUser.lastName,
			email: updateUser.email,
			isAdmin: updateUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc Delete a user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		await user.remove();
		res.json({ message: 'User removed successfully!' });
	} else {
		res.status(404);
		throw new Error('User NOT FOUND!');
	}
});

export {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	getUserById,
	editUserInfo,
	deleteUser,
};
