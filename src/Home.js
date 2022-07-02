import React from 'react';
import './Home.css';
import Product from './Product';

const Home = () => {
	return (
		<div className='home'>
			<div className='home__container'>
				<img
					className='home__image'
					src='https://i0.wp.com/www.aftvnews.com/wp-content/uploads/2021/07/Prime-Video-Watch-Party-on-Fire-TV.jpg?fit=1920%2C1080&quality=100&ssl=1'
					alt=''
				/>

				<div className='home__row'>
					<Product
						id={'9509509'}
						title='The lean startup '
						image='https://m.media-amazon.com/images/I/71rXSVqET9L._AC_UL320_.jpg'
						price={29.99}
						rating={5}
					/>
					<Product
						id={'905905990'}
						title='The lean startup'
						image='https://m.media-amazon.com/images/I/81ctzUMPCrL._AC_UL320_.jpg'
						price={2229.99}
						rating={5}
					/>
				</div>
				<div className='home__row'>
					<Product
						id={'95895090'}
						title='The lean startup'
						image='https://m.media-amazon.com/images/I/91t5RYaAFDL._AC_UL320_.jpg'
						price={29.99}
						rating={4}
					/>
					<Product
						id={'950950534'}
						title='The lean startup'
						image='https://m.media-amazon.com/images/I/514VNpfgxIL._AC_UL320_.jpg'
						price={445.99}
						rating={5}
					/>
					<Product
						id={' 4909054'}
						title='The lean startup'
						image='https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_UL320_.jpg'
						price={245.99}
						rating={3}
					/>
				</div>
				<div className='home__row'>
					<Product
						id={'905809'}
						title='The lean startup'
						image='https://m.media-amazon.com/images/I/71rXSVqET9L._AC_UL320_.jpg'
						price={24.99}
						rating={4}
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
