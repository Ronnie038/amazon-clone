import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';

const CheckoutProduct = ({ id, title, image, price, rating }) => {
	const [{ basket }, dispatch] = useStateValue();
	console.log(basket);

	const removeFromBasket = () => {
		dispatch({
			type: 'REMOVE_FROM_BASKET',
			id: id,
		});
	};

	return (
		<div className='checkoutProduct'>
			<img src={image} alt='' className='checkoutProduct__image' />
			<div className='checkoutProduct__info'>
				<p>{title}</p>
				<p>
					<small>$</small>
					<strong>{price}</strong>
				</p>
				<div className='checkoutProduct__rating'>
					{Array(rating)
						.fill()
						.map(() => (
							<span>🌟</span>
						))}
				</div>
				<button onClick={removeFromBasket}>remove product</button>
			</div>
		</div>
	);
};

export default CheckoutProduct;
