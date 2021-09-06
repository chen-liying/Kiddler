import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useSelector } from 'react-redux';
import { Card, Container } from 'react-bootstrap';
import {
	Grid,
	Checkbox,
	FormControlLabel,
	TextField,
	NativeSelect,
	InputLabel,
} from '@material-ui/core';
import _ from 'lodash';
import { statesList } from '../states';

const UserTextField = forwardRef((props, ref) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	//console.log(userInfo);

	const [firstName, setFirstName] = useState(
		shippingAddress.firstName || userInfo.firstName || ''
	);
	const [lastName, setLastName] = useState(
		shippingAddress.lastName || userInfo.lastName || ''
	);
	const [address, setAddress] = useState(shippingAddress.address || '');
	const [city, setCity] = useState(shippingAddress.city || '');
	const [state, setState] = useState(shippingAddress.state || '');
	const [postalCode, setPostalCode] = useState(
		shippingAddress.postalCode || ''
	);
	const [country, setCountry] = useState(shippingAddress.country || '');

	useImperativeHandle(ref, () => ({
		getUserInfo() {
			return {
				firstName,
				lastName,
				address,
				city,
				state,
				postalCode,
				country,
			};
		},
	}));

	return (
		<Container fluid>
			<Card className='mb-3'>
				<Card.Header className='card-header'>{props.header}</Card.Header>
				<Card.Body>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id='firstName'
								name='firstName'
								label='First name'
								fullWidth
								value={firstName}
								onChange={(e) => {
									setFirstName(_.capitalize(e.target.value));
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id='lastName'
								name='lastName'
								label='Last name'
								fullWidth
								value={lastName}
								onChange={(e) => {
									setLastName(_.capitalize(e.target.value));
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								id='address1'
								name='address1'
								label='Address'
								fullWidth
								value={address}
								onChange={(e) => {
									setAddress(_.startCase(_.camelCase(e.target.value)));
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id='city'
								name='city'
								label='City'
								fullWidth
								value={city}
								onChange={(e) => {
									setCity(_.capitalize(e.target.value));
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel shrink style={{ margin: '0px' }}>
								State/Province/Region
							</InputLabel>
							<NativeSelect
								id='state'
								name='state'
								label='State/Province/Region'
								fullWidth
								value={state}
								onChange={(e) => {
									console.log(e.target.value);
									setState(_.upperCase(e.target.value));
								}}
							>
								<option value=''>State</option>
								{statesList.map((state, index) => (
									<option key={index} value={state.abbreviation}>
										{state.name}
									</option>
								))}

								{/* <option value='WA'>Washington</option>
								<option value='TX'>Texas</option>
								<option value='CA'>California</option> */}
							</NativeSelect>

							{/* <TextField
								id='state'
								name='state'
								label='State/Province/Region'
								fullWidth
								value={state}
								onChange={(e) => {
									setState(_.upperCase(e.target.value));
								}}
							/> */}
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id='zip'
								name='zip'
								label='Zip / Postal code'
								fullWidth
								value={postalCode}
								onChange={(e) => {
									setPostalCode(e.target.value);
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id='country'
								name='country'
								label='Country'
								fullWidth
								value={country}
								onChange={(e) => {
									setCountry(e.target.value);
								}}
							/>
						</Grid>
						{props.isPaymentScreen && (
							<Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox
											defaultChecked={true}
											color='primary'
											name='saveAddress'
											value='yes'
										/>
									}
									label='Same as shipping details'
								/>
							</Grid>
						)}
					</Grid>
				</Card.Body>
			</Card>
		</Container>
	);
});

export default UserTextField;
