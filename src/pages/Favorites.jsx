import { Link } from 'react-router-dom'
import Card from '../components/Card/Card'
import Info from '../components/Info/Info'

import { useContext } from 'react'
import AppContext from '../context/context'
import { useNavigate } from 'react-router'

function Favorites({ onAddToCart, onAddToFavorite, isAddedProducts }) {
	const { products, isLoading } = useContext(AppContext)
	let navigate = useNavigate()

	const favoriteProducts = products.filter((item) => item.favorite === true)

	const renderProducts = () => {
		return (isLoading ? [...Array(8)] : favoriteProducts).map((item, index) => (
			<Card
				isAdded={isAddedProducts(item && item.id)}
				onAddToCart={() => onAddToCart(item && item.id)}
				onAddToFavorite={() => onAddToFavorite(item && item.id)}
				key={index}
				{...item}
			/>
		))
	}
	return (
		<div className={'content'}>
			<div className={'d-flex align-center mb-40 flex-wrap'}>
				<Link to={'/'}>
					<img
						src={'/img/icons/back.svg'}
						alt="back"
						className={'mr-20 cu-p'}
					/>
				</Link>
				<h1 className={'content-title'}>Мои закладки</h1>
			</div>
			{favoriteProducts.length !== 0 ? (
				<div className={'content-products'}>{renderProducts()}</div>
			) : (
				<Info
					onClose={() => navigate('/')}
					description={'Вы ничего не добавляли в закладки'}
					title={'Закладок нет :('}
					img={'/img/emoji-asking.png'}
				/>
			)}
		</div>
	)
}

export default Favorites
