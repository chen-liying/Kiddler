import React, { useState } from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

function PaymentForm() {
	const [number, setNumber] = useState('');
	const [name, setName] = useState('');
	const [expiry, setExpiry] = useState('');
	const [cvc, setCvc] = useState('');
	const [focused, setFocused] = useState('');

	return (
		<Container fluid>
			<Card className='mb-3'>
				<Card.Header>Debit/Credit Card Information</Card.Header>
				<Card.Body>
					<Row>
						<Col md={7}>
							<Cards
								cvc={cvc}
								expiry={expiry}
								focused={focused}
								name={name}
								number={number}
							/>
						</Col>
						<Col>
							<Row>
								<input
									type='tel'
									maxLength='19'
									name='number'
									placeholder='Card Number'
									onChange={(e) => {
										e.target.value = e.target.value
											.replace(/[^\dA-Z]/g, '')
											.replace(/(.{4})/g, '$1 ')
											.trim();
										setNumber(e.target.value);
									}}
									onFocus={(e) => setFocused(e.target.name)}
								/>
							</Row>
							<Row style={{ color: 'grey' }}> E.g.: 49.., 51.., 36.</Row>
							<Row>
								<input
									type='text'
									name='Name'
									maxLength='30'
									placeholder='Name'
									onChange={(e) => setName(e.target.value)}
									onFocus={(e) => setFocused(e.target.name)}
								/>
							</Row>
							<Row>
								<input
									size='7'
									maxLength='5'
									type='text'
									name='expiry'
									placeholder='Expiry'
									onChange={(e) => {
										if (e.target.value.length < 4) {
											e.target.value = e.target.value
												.replace(/[^\dA-Z]/g, '')
												.replace(/(.{2})/g, '$1/')
												.trim();
										}
										setExpiry(e.target.value);
									}}
									onFocus={(e) => setFocused(e.target.name)}
								/>
								<input
									size='3'
									maxLength='3'
									type='tel'
									name='cvc'
									placeholder='CVC'
									onChange={(e) => {
										e.target.value = e.target.value
											.replace(/[^\dA-Z]/g, '')
											.trim();
										setCvc(e.target.value);
									}}
									onFocus={(e) => setFocused(e.target.name)}
								/>
							</Row>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default PaymentForm;
