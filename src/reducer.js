export const initalState = {
	basket: [],
};
export const getBasketTotal = (basket) => {
	let total = basket?.reduce((amount, item) => item.price + amount, 0);

	return total;
};

const reducer = (state, action) => {
	console.log(action);
	switch (action.type) {
		case 'ADD_TO_BASKET':
			return {
				...state,
				basket: [...state.basket, action.item],
			};

		case 'REMOVE_FROM_BASKET':
			// return {
			// 	...state,
			// 	basket: state.basket.filter((item) => item.id !== action.id),
			// };
			const index = state.basket.findIndex(
				(basketItem) => basketItem.id === action.id
			);

			let newBasket = [...state.basket];
			console.log(index);
			if (index >= 0) {
				newBasket.splice(index, 1);
			}

			return {
				...state,
				basket: newBasket,
			};

		default:
			return state;
	}
};

export default reducer;
