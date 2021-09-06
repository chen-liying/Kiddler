import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
	editUserInfoAction,
	getUserDetailsAction,
} from '../actions/userActions';

import FormContainer from '../components/FormContainer';
import { ADMIN_EDIT_INFO_RESET } from '../constants/userConstants';

function UserEditScreen({ match, history }) {
	const userId = match.params.id;

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const adminEditInfo = useSelector((state) => state.adminEditUserInfo);
	const {
		loading: loadingEditInfo,
		error: errorEditInfo,
		success: successEditInfo,
	} = adminEditInfo;

	useEffect(() => {
		if (successEditInfo) {
			dispatch({
				type: ADMIN_EDIT_INFO_RESET,
			});

			history.push('/admin/userlist');
		} else {
			if (!user.firstName || user._id !== userId) {
				dispatch(getUserDetailsAction(userId));
			} else {
				setFirstName(user.firstName);
				setLastName(user.lastName);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [dispatch, history, userId, user, successEditInfo]);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			editUserInfoAction({
				_id: user._id,
				firstName,
				lastName,
				email,
				isAdmin,
			})
		);
	};

	return (
		<>
			<Link to='/admin/userlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User Info</h1>
				{loadingEditInfo && <Loader />}
				{errorEditInfo && <Message variant='danger'>{errorEditInfo}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error} </Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>FirstName</Form.Label>
							<Form.Control
								type='FirstName'
								placeholder='Enter FirstName'
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='email'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='isadmin'>
							<Form.Check
								type='checkbox'
								label='Is Admin'
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							></Form.Check>
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

export default UserEditScreen;
