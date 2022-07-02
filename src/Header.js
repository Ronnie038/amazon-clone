import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { NavLink } from 'react-router-dom';
import { useStateValue } from './StateProvider';

const Header = () => {
	const [{ basket }, dispatch] = useStateValue();
	return (
		<div className='header'>
			<NavLink to='/'>
				<img
					className='header__logo'
					src='https://pngimg.com/uploads/amazon/amazon_PNG25.png'
					alt='Amazon logo'
				/>
			</NavLink>

			<div className='header__search'>
				<input type='text' className='header__searchInput' />
				<SearchIcon className='header__searchIcon' />
			</div>

			<div className='header__nav'>
				<div className='header__option'>
					<span className='header__optionLineOne'>Hello Guest</span>
					<span className='header__optionLineTwo'>Sign in</span>
				</div>
				<div className='header__option'>
					<span className='header__optionLineOne'>Return </span>
					<span className='header__optionLineTwo'>& Orders</span>
				</div>
				<div className='header__option'>
					<span className='header__optionLineOne'>Your </span>
					<span className='header__optionLineTwo'>Prime</span>
				</div>
				<NavLink to='checkout'>
					<div className='header__optionBusket'>
						<ShoppingBasketIcon className='header__busketIcon header__optionLineTwo' />
						<span className='header__basketCount'>{basket?.length}</span>
					</div>
				</NavLink>
			</div>
		</div>
	);
};

export default Header;
