import { useContext, useState } from 'react'

import Search from '../components/Search/Search'
import Card from '../components/Card/Card'

import AppContext from '../context/context'

function Home({ onAddToCart, onAddToFavorite, isAddedProducts }) {
	const { products, isLoading } = useContext(AppContext)
	const [searchValue, setSearchValue] = useState('')

	const renderProducts = () => {
		const filteredProducts = products.filter((item) =>
			item.title.toLowerCase().includes(searchValue.toLowerCase())
		)
		return (isLoading ? [...Array(8)] : filteredProducts).map((item, index) => (
			<Card
				isAdded={isAddedProducts(item && item.id)}
				onAddToCart={(obj) => onAddToCart(obj)}
				onAddToFavorite={() => onAddToFavorite(item && item.id)}
				key={index}
				{...item}
			/>
		))
	}

	const onChangeSearchInput = (e) => {
		setSearchValue(e.target.value)
	}

	const onClearSearchValue = () => {
		setSearchValue('')
	}

	return (
		<div className={'content'}>
			<div className={'d-flex justify-between align-center mb-40 flex-wrap'}>
				<h1 className={'content-title'}>
					{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}
				</h1>
				<Search
					searchValue={searchValue}
					onChangeSearchValue={onChangeSearchInput}
					onClearSearchValue={onClearSearchValue}
				/>
			</div>
			<div className="content-products">{renderProducts()}</div>
		</div>
	)
}

export default Home
