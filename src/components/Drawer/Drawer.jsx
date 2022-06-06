import Cart from '../Cart/Cart'
import styles from './Drawer.module.scss'
import { useContext, useState } from 'react'
import AppContext from '../../context/context'
import Info from '../Info/Info'
import axios from 'axios'
import useCart from '../../hooks/useCart'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onClose }) {
	const { setIsLoading } = useContext(AppContext)
	const [orderId, setOrderId] = useState(null)
	const [isOrderComplete, setIsOrderComplete] = useState(false)
	const { cartItems, setCartItems } = useCart()

	const onClickOrder = async () => {
		setIsLoading(true)
		try {
			const { data } = await axios.post(
				'https://628ffcdf665ea71fe12b7ae5.mockapi.io/orders',
				{ items: cartItems }
			)

			setOrderId(data.id)
			setIsOrderComplete(true)
			setCartItems([])

			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i]
				await axios.delete(
					'https://628ffcdf665ea71fe12b7ae5.mockapi.io/cart/' + item.id
				)
				await delay(1000)
			}
		} catch (e) {
			alert('Не удалось оформить заказ')
		}
		setIsLoading(false)
	}

	return (
		<div className={styles.overlay}>
			<div className={styles.drawer}>
				<h2 className={'d-flex justify-between mb-30'}>
					Корзина
					<img
						src={'/img/icons/cancel.svg'}
						alt="cancel"
						className={'cart-close cu-p'}
						onClick={onClose}
					/>
				</h2>
				{!cartItems.length ? (
					<Info
						onClose={onClose}
						description={
							isOrderComplete
								? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
								: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
						}
						title={isOrderComplete ? 'Заказ оформлен' : 'Корзина пуста'}
						img={isOrderComplete ? '/img/order.png' : '/img/cart-empty.png'}
					/>
				) : (
					<Cart onClickOrder={onClickOrder} />
				)}
			</div>
		</div>
	)
}

export default Drawer
