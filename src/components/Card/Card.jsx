import styles from './Card.module.scss'
import Skeleton from '../Skeleton/Skeleton'
import { useContext } from 'react'
import AppContext from '../../context/context'

function Card({
	id,
	title,
	img,
	cost,
	favorite,
	onAddToFavorite,
	onAddToCart,
	isAdded,
	isOrder
}) {
	const { isLoading } = useContext(AppContext)
	const obj = { id, parentId: id, title, cost, img }

	return (
		<div className={`${styles.card} mb-30`}>
			{isLoading ? (
				<Skeleton />
			) : (
				<>
					{!isOrder ? (
						<img
							src={
								favorite
									? '/img/icons/favorite.svg'
									: '/img/icons/unfavorite.svg'
							}
							className={`${styles.cardFavorite}`}
							onClick={onAddToFavorite}
							width={32}
							height={32}
							alt="favorite"
						/>
					) : (
						''
					)}

					<img className={styles.cardImg} src={img} alt="item" />
					<p className={styles.cardTitle}>{title}</p>
					<div
						className={`${styles.cardBottom} d-flex justify-between align-center`}
					>
						<div className={'d-flex flex-column'}>
							<span>Цена:</span>
							<b>{cost} руб.</b>
						</div>
						{!isOrder ? (
							<img
								width={32}
								height={32}
								src={isAdded ? 'img/icons/checked.svg' : 'img/icons/plus.svg'}
								alt="add-to-cart"
								className={'cu-p'}
								onClick={() => onAddToCart(obj)}
							/>
						) : (
							''
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default Card
