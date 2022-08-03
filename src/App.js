import React, { useEffect } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import Orders from './Orders';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe(
	'pk_test_51LPmOaFCWAR3yJ7feXP3RQFLYkmrCJ6Gd12yfY6Z8l6ALc3LpQcdJPW2lXPvkvIIDbUmWaOQ4rcmdYUTOgevTrvT00N3YCq6gt'
);
const App = () => {
	const [{ user }, dispatch] = useStateValue();

	useEffect(() => {
		// will only run once when the app component leoads...
		onAuthStateChanged(auth, (authUser) => {
			// console.log('THE USER IS>>>', authUser);
			if (authUser) {
				// the user just logged in/the wa logged in
				dispatch({
					type: 'SET_USER',
					user: authUser,
				});
			} else {
				// the user is logged out
				dispatch({
					type: 'SET_USER',
					user: null,
				});
			}
		});
	}, []);

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Main />}>
					<Route index element={<Home />} />
					<Route path='checkout' element={<Checkout />} />
					<Route
						path='payment'
						element={
							<Elements stripe={promise}>
								<Payment />
							</Elements>
						}
					></Route>
					<Route path='orders' element={<Orders />}></Route>
				</Route>
				<Route path='login' element={<Login />}></Route>
			</Routes>
		</Router>
	);
};

export default App;
