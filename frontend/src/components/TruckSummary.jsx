import React from 'react';

export const calculateNumberItems = (cartItems) => {
	return cartItems.reduce((acc, item) => acc + item.qty, 0);
};

function TruckSummary({ cartItems }) {
	const numItems = calculateNumberItems(cartItems);

	return (
		<React.Fragment>
			<i className='fas fa-truck'></i> Shipping {numItems}{' '}
			{numItems === 1 ? 'item' : 'items'}
		</React.Fragment>
	);
}

export default TruckSummary;
