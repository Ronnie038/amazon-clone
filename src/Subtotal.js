import React from 'react';
import './Subtotal.css';
import CrrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';

// import ShoppingBasket from '@mui/icons-material/ShoppingBasket';

const Subtotal = () => {
	const [{ basket }, dispatch] = useStateValue();

	return (
		<div className='subtotal'>
			<CrrencyFormat
				renderText={(value) => (
					<>
						<p>
							Subtotal({basket.length} items) : <strong>{value}</strong>
						</p>
						<small className='subtotal__gift'>
							<input type='checkbox' />
							This order contains a gift
						</small>
					</>
				)}
				decimalScale={2}
				value={getBasketTotal(basket)}
				displayType={'text'}
				thousandSeparator={true}
				prefix={'$'}
			/>
			<br />
			<button>Proced to Checkout</button>
		</div>
	);
};

export default Subtotal;
