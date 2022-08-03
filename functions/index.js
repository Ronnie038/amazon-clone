const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');
// const { request, response } = require('express');
const stripe = require('stripe')(
	'sk_test_51LPmOaFCWAR3yJ7fWTtC4h5Tg9HF8jv8Q9tBW8XP1ecKQmDBQCnXsM4s610a0nx2l2iKHi3ikZh3ocWr1XVGj4fj001fmfOZTa'
);
// API

// app config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get('/', (request, response) => response.status(200).send('hello world'));

app.post('/payments/create', async (request, response) => {
	const total = request.query.total;

	console.log('payment reques recieved Boom !!! for this amount >>>', total);

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total, // subunits of the currency
		currency: 'usd',
	});

	// ok Created
	response.status(201).send({
		clientSecret: paymentIntent.client_secret,
	});
});

//  Listen command
// exports.api = functions.https.onRequest(app);
exports.api = functions.https.onRequest(app);

// Example endpoind
// http://localhost:5001/clone-7f4ba/us-central1/api
