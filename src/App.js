import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Checkout from './Checkout';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Main />}>
					<Route index element={<Home />} />
					<Route path='checkout' element={<Checkout />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
