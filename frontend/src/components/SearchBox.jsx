import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function SearchBox({ history }) {
	const [keyword, setKeyword] = useState('');

	const submitHandler = (e) => {
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
	};

	return (
		<Form
			onSubmit={submitHandler}
			inline
			style={{ width: '65%', justifyContent: 'center' }}
			className='ml-sm-3'
		>
			<Form.Control
				type='text'
				name='query'
				onChange={(e) => setKeyword(e.target.value)}
				placeholder='Seatch Products ...'
				style={{ width: '70%', height: '50px' }}
			></Form.Control>
			<Button
				type='submit'
				variant='warning'
				className='p-2'
				style={{ width: '10%', height: '50px', marginTop: '10px' }}
			>
				<i className='fas fa-search'></i>
			</Button>
		</Form>
	);
}

export default SearchBox;
