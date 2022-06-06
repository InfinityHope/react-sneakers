import Header from './components/Header/Header'
import Drawer from './components/Drawer/Drawer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import AppContext from './context/context'
import Orders from './pages/Orders'

function App() {
	const [products, setProducts] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [cartOpened, setCartOpened] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		;(async () => {
			try {
				const [products, cart] = await Promise.all([
					axios.get('https://628ffcdf665ea71fe12b7ae5.mockapi.io/products'),
					axios.get('https://628ffcdf665ea71fe12b7ae5.mockapi.io/cart')
				])

				setIsLoading(false)

				setCartItems(cart.data)
				setProducts(products.data)
			} catch (e) {
				alert('Не удалось выполнить запрос к бд')
				console.error(e)
			}
		})()
	}, [])

	const onAddToCart = async (obj) => {
		try {
			const findItem = cartItems.find(
				(item) => Number(item.parentId) === Number(obj.id)
			)
			if (findItem) {
				setCartItems((prev) =>
					prev.filter((item) => Number(item.parentId) !== Number(obj.id))
				)
				await axios.delete(
					`https://628ffcdf665ea71fe12b7ae5.mockapi.io/cart/${findItem.id}`
				)
			} else {
				setCartItems((prev) => [...prev, obj])
				const { data } = await axios.post(
					'https://628ffcdf665ea71fe12b7ae5.mockapi.io/cart',
					obj
				)
				setCartItems((prev) =>
					prev.map((item) => {
						if (item.parentId === data.parentId) {
							return {
								...item,
								id: data.id
							}
						}
						return item
					})
				)
			}
		} catch (error) {
			alert('Ошибка при добавлении в корзину')
			console.error(error)
		}
	}

	const changeFavoriteProp = async (prod, boolean, id) => {
		try {
			const favoriteProd = {
				...prod,
				favorite: boolean
			}
			await axios.put(
				`https://628ffcdf665ea71fe12b7ae5.mockapi.io/products/${id}`,
				favoriteProd
			)
			setProducts(
				products.map((product) =>
					product.id === id ? { ...product, favorite: boolean } : product
				)
			)
		} catch (e) {
			console.error(e)
		}
	}

	const onAddToFavorite = async (id) => {
		const prod = products.find((item) => item.id === id)
		try {
			if (!prod.favorite) {
				await changeFavoriteProp(prod, true, id)
			} else {
				await changeFavoriteProp(prod, false, id)
			}
		} catch (e) {
			alert('Не удалось добавить продукт избранное')
			console.error(e)
		}
	}

	const onRemoveItem = async (id) => {
		try {
			await axios.delete(
				`https://628ffcdf665ea71fe12b7ae5.mockapi.io/cart/${id}`
			)
			setCartItems((prev) =>
				prev.filter((item) => Number(item.id) !== Number(id))
			)
		} catch (e) {
			alert('Не удалось удалить продукт')
			console.error(e)
		}
	}

	const isAddedProducts = (id) => {
		return cartItems.some(
			(cartItem) => Number(cartItem.parentId) === Number(id)
		)
	}

	return (
		<AppContext.Provider
			value={{
				cartItems,
				isLoading,
				setIsLoading,
				products,
				onRemoveItem,
				setCartItems
			}}
		>
			<div className={'wrapper clear'}>
				{cartOpened && <Drawer onClose={() => setCartOpened(false)} />}
				<Header onOpenCart={() => setCartOpened(true)} />
				<Routes>
					<Route
						path={'/'}
						element={
							<Home
								onAddToCart={onAddToCart}
								onAddToFavorite={onAddToFavorite}
								isAddedProducts={isAddedProducts}
							/>
						}
					/>
					<Route
						path={'/favorites'}
						element={
							<Favorites
								onAddToCart={onAddToCart}
								onAddToFavorite={onAddToFavorite}
								isAddedProducts={isAddedProducts}
							/>
						}
					/>
					<Route path={'/orders'} element={<Orders />} />
				</Routes>
			</div>
		</AppContext.Provider>
	)
}

export default App
