import styles from './CartItem.module.scss'

function CartItem({ title, cost, img, onRemoveItem }) {
	return (
		<div
			className={`${styles.cartItem} d-flex justify-between align-center mb-20`}
		>
			<div
				style={{ backgroundImage: `url(${img})` }}
				className={styles.cartItemImg}
			/>
			<div className="mr-15">
				<p className={'mb-5'}>{title}</p>
				<b>{cost} руб.</b>
			</div>
			<img
				onClick={onRemoveItem}
				src={'/img/icons/cancel.svg'}
				alt="cancel"
				className={styles.cartItemRemove}
			/>
		</div>
	)
}

export default CartItem
