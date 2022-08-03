import React, { useEffect, useState } from 'react';
import './Payment.css';
import { NavLink, useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer';
import { endBefore } from 'firebase/firestore';
import CrrencyFormat from 'react-currency-format';
import { async } from '@firebase/util';
import axios from './axios';
import { db } from './firebase';
import { collection, setDoc, addDoc, doc } from 'firebase/firestore';

const Payment = () => {
	const navigate = useNavigate();
	const [{ basket, user }, dispatch] = useStateValue();

	const stripe = useStripe();
	const elements = useElements();

	const [succeded, setSucceded] = useState(false);
	const [processing, setProcessing] = useState('');
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState(true);

	useEffect(() => {
		// *generate the special stripe secret which allows us to charge a customer

		const getClientsecret = async () => {
			const response = await axios({
				method: 'post',
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
			});
			// setClientSecret(response.data.clientSecret);

			setClientSecret(response.data.clientSecret);
		};

		getClientsecret();
	}, [basket]);

	console.log('the secret is >>>>', clientSecret);

	const handleSubmit = async (event) => {
		// * do all the fancy stripe stuff
		event.preventDefault();
		setProcessing(true);

		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				// PaymentIntent = payment confirmation
				setDoc(doc(db, 'users', user?.uid, 'orders', paymentIntent.id), {
					basket: basket,
					amount: paymentIntent.amount,
					created: paymentIntent.created,
				});
				setSucceded(true);
				setError(null);
				setProcessing(false);

				dispatch({
					type: 'EMPTY_BASKET',
				});

				navigate('/orders', { replace: true });
			});
	};

	const handleChange = (event) => {
		// * listen for changes in the cardElement
		// * and display any errors as the customer types their card details

		setDisabled(event.empty);
		setError(event.error ? event.error.message : '');
	};

	return (
		<div className='payment'>
			<div className='payment__container'>
				<h1>
					Checkout (<NavLink to='/checkout'>{basket?.length} items</NavLink>)
				</h1>
				{/* payment seftion - delivery address */}
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Delivery Address</h3>
					</div>
					<div className='payment__address'>
						<p>{user?.email}</p>

						<p>123 React Lane</p>
						<p>Dhaka 1208 </p>
					</div>
				</div>
				{/* payment secfttion - review items */}
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Review items and delivery</h3>
					</div>
					<div className='payment__items'>
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
				{/* payment secvtion - payment method */}
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Payment Method</h3>
					</div>
					<div className='payment__details'>
						{/* STRIPE MAGIC WILL GO */}

						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />
							<div className='payment__priceContainer'>
								<CrrencyFormat
									renderText={(value) => (
										<>
											<h3>Order Total :{value}</h3>
										</>
									)}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={'text'}
									thousandSeparator={true}
									prefix={'$'}
								/>
								<button disabled={processing || disabled || succeded}>
									<span>{processing ? <p>Proccessing</p> : 'Buy Now'}</span>
								</button>
							</div>
							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Payment;
