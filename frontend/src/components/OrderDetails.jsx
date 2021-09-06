import React from 'react';
import { useSelector } from 'react-redux';
import EmailAddressCard from './EmailAddressCard';
import ShippingAddressCard from './ShippingAddressCard';
import PaymentMethodCard from './PaymentMethodCard';
import ItemsDetailCard from './ItemsDetailCard';

function OrderDetails() {
	const cart = useSelector((state) => state.cart);

	return (
		<React.Fragment>
			<EmailAddressCard isEncoded={true} />

			<ShippingAddressCard />

			<PaymentMethodCard />

			<ItemsDetailCard header='Shipping Bag' items={cart.cartItems} />
		</React.Fragment>
	);
}

export default OrderDetails;
