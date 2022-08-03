import React from 'react';
import './Checkout.css';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';

const Checkout = () => {
	const [{ basket, user }, dispatch] = useStateValue();

	return (
		<div className='checkout'>
			<div className='checkout__container'>
				<div className='checkout__left'>
					<img
						src='https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/AUX/landingpage-header-desktop._TTW_.jpg'
						className='checkout__ad'
						alt=''
					/>
					<div className=''>
						<h3>HELLO {user?.email}</h3>
						<h2 className='checkout__title'>Your Shopping Basket</h2>
						{basket.map((item) => (
							<CheckoutProduct
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								rating={item.rating}
							/>
						))}
					</div>
				</div>
				<div className='checkout__right'>
					<Subtotal />
				</div>
			</div>
		</div>
	);
};

export default Checkout;
