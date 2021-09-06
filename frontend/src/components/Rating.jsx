import React from 'react';

function Rating(props) {
	return (
		<div className='rating'>
			{[1, 2, 3, 4, 5].map((index) => (
				<span key={index}>
					<i
						style={{ color: props.color }}
						className={
							props.rating >= index
								? 'fas fa-star'
								: props.rating >= index - 0.5
								? 'fas fa-star-half-alt'
								: 'far fa-star'
						}
					></i>
				</span>
			))}

			<span> {props.numReviews} reviews</span>
		</div>
	);
}

Rating.defaultProps = {
	color: '#f8e825',
};

// Rating.propTypes = {
// 	rating: PropTypes.number.isRequired,
// 	numReviews: PropTypes.number.isRequired,
// 	color: PropTypes.string,
// };

export default Rating;
