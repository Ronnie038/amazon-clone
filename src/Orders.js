import React from 'react';
import './Orders.css';
import { db } from './firebase';
import { useState } from 'react';
import { useEffect } from 'react';
import { useStateValue } from './StateProvider';
import {
	setDoc,
	doc,
	orderBy,
	docs,
	onSnapshot,
	query,
	collection,
} from 'firebase/firestore';
import Order from './Order';

const Orders = () => {
	const [orders, setOrders] = useState();
	const [{ basket, user }, dispatch] = useStateValue();

	useEffect(() => {
		if (user) {
			onSnapshot(
				collection(db, 'users', user?.uid, 'orders'),
				orderBy('created', 'desc'),
				(snapshot) => {
					setOrders(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					);
				},
				{}
			);
		} else {
			setOrders([]);
		}
	}, [user]);
	return (
		<div className='orders'>
			<center>
				<h1>Your Orders </h1>
			</center>
			<div className='orders__order'>
				{orders?.map((order) => (
					<Order order={order} />
				))}
			</div>
		</div>
	);
};

export default Orders;
