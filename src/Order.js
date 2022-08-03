import React from 'react';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct';
import './Order.css';
import CurrencyFormat from 'react-currency-format';

const Order = ({ order }) => {
	return (
		<div className='order'>
			<h2 className='order_1'>Order</h2>
			<p className='order__date order_1'>
				{moment.unix(order.data.created).format('MMM Do YYYY, h:mma')}
			</p>
			<p className='order__id order_1'>
				<small>{order.id}</small>
			</p>
			{order.data.basket?.map((item) => (
				<CheckoutProduct
					id={item.id}
					title={item.title}
					image={item.image}
					price={item.price}
					rating={item.rating}
					hideButton
				/>
			))}

			<div className='order_1 order_total'>
				<CurrencyFormat
					renderText={(value) => (
						<>
							<h3>Order Total :{value}</h3>
						</>
					)}
					decimalScale={2}
					value={order.data.amount / 100}
					displayType={'text'}
					thousandSeparator={true}
					prefix={'$'}
				/>
			</div>
		</div>
	);
};

export default Order;
