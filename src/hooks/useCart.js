import { useContext } from 'react'
import AppContext from '../context/context'

export const UseCart = () => {
	const { cartItems, setCartItems } = useContext(AppContext)
	const totalSum = cartItems.reduce((sum, item) => item.cost + sum, 0)
	const tax = Math.floor((totalSum / 100) * 5)
	return { totalSum, tax, cartItems, setCartItems }
}

export default UseCart
