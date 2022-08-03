import React, { useState } from 'react';
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// console.log(email);
	// console.log(password);

	const signIn = (e) => {
		e.preventDefault();

		signInWithEmailAndPassword(auth, email, password)
			.then((user) => {
				navigate('/', { replace: true });
			})
			.catch((error) => alert(error));
		//
		// some fancy firebase login shitt
	};
	const register = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
			.then((auth) => {
				// is successfully created a new user with email and password
				console.log(auth);

				if (auth) {
					navigate('/', { replace: true });
				}
			})
			.catch((error) => alert(error.message));

		// do some fancy firebase regeister shitt.............
	};

	return (
		<div className='login'>
			<NavLink to='/'>
				<img
					className='login__logo'
					src='https://cdn2.downdetector.com/static/uploads/logo/amazon.png'
					alt=''
				/>
			</NavLink>
			<div className='login__container'>
				<h1>Sign in</h1>
				<form>
					<label htmlFor='email'>E-smail</label>
					<input
						value={email}
						type='email'
						autoComplete='off'
						name='email'
						id='email'
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor='password'>Password</label>
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type='password'
						name='password'
						id='password'
						required
					/>

					<button onClick={signIn} type='submit' className='login__signInBtn'>
						Sign in
					</button>
				</form>
				<p>
					By signing-im you agree to AMAZON FAKE CLONE' Conditions of Use &
					Sale. Please se our Privacy Notice, ou Cookies Notice And our Internet
					Based Ads
				</p>
				<button onClick={register} className='login__registerBtn'>
					Create your own Amazon Account
				</button>
			</div>
		</div>
	);
};

export default Login;
