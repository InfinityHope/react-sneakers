import React, { useContext } from 'react'
import CartItem from '../CartItem/CartItem'
import styles from './Cart.module.scss'
import GreenBtn from '../UI/GreenBtn/GreenBtn'
import AppContext from '../../context/context'
import useCart from '../../hooks/useCart'

function Cart({ onClickOrder }) {
	const { onRemoveItem, isLoading } = useContext(AppContext)
	const { cartItems, totalSum, tax } = useCart()

	const renderItems = () => {
		return cartItems.map((item) => {
			return (
				<CartItem
					onRemoveItem={() => onRemoveItem(item.id)}
					key={item.id}
					{...item}
				/>
			)
		})
	}

	return (
		<>
			<div className={styles.cartItems}>{renderItems()}</div>
			<div className={styles.cartTotal}>
				<ul>
					<li>
						<span>Итого</span>
						<div />
						<b>{totalSum} руб.</b>
					</li>
					<li>
						<span>Налог 5%</span>
						<div />
						<b>{tax} руб. </b>
					</li>
				</ul>
				<div className="d-flex justify-center">
					<GreenBtn
						disabled={isLoading}
						onClick={onClickOrder}
						text={'Оформить заказ'}
						type={'right'}
					/>
				</div>
			</div>
		</>
	)
}

export default Cart
