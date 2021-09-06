import bcrypt from 'bcryptjs';

const users = [
	{
		firstName: 'Admin',
		lastName: 'User',
		email: 'admin@email.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		firstName: 'Peppa',
		lastName: 'Pig',
		email: 'peppa@email.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		firstName: 'George',
		lastName: 'Pig',
		email: 'george@email.com',
		password: bcrypt.hashSync('123456', 10),
	},
];

export default users;
