import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

function EmailAddressCard({ isEncoded }) {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const email = userInfo.email;

	return (
		<React.Fragment>
			<Card className='mb-3'>
				<Card.Header className='card-header'>Email Address</Card.Header>
				<Card.Body>
					{isEncoded
						? email.replace(
								/(.{1})(.*)(.{1})(?=@)/,
								function (gp1, gp2, gp3, gp4) {
									//console.log(gp1, ',', gp2, ',', gp3, ',', gp4);

									for (let i = 0; i < gp3.length; i++) gp2 += '*';

									return gp2 + gp4;
								}
						  )
						: email}
				</Card.Body>
			</Card>
		</React.Fragment>
	);
}

export default EmailAddressCard;
