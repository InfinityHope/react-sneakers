import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import useCart from '../../hooks/useCart'

function Header({ onOpenCart }) {
	const { totalSum } = useCart()

	return (
		<header className={`${styles.header} d-flex justify-between p-40`}>
			<Link to="/">
				<div className={'d-flex align-center cu-p'}>
					<img
						src={'/img/icons/logo.svg'}
						alt="logo"
						width={40}
						height={40}
						className={`${styles.headerLogo} mr-15`}
					/>

					<div>
						<h3 className={'text-uppercase'}>React Sneakers</h3>
						<p>Магазин лучших кросовок</p>
					</div>
				</div>
			</Link>
			<ul className={`${styles.List} d-flex justify-between align-center`}>
				<li onClick={onOpenCart} className={'cu-p'}>
					<img className={'mr-10'} src={'/img/icons/cart.svg'} alt="cart" />
					<span>{totalSum} руб.</span>
				</li>
				<Link to="/favorites">
					<li className={'cu-p'}>
						<img src={'/img/icons/favorites.svg'} alt="favorites" />
					</li>
				</Link>
				<Link to="/orders">
					<li className={'cu-p'}>
						<img src={'/img/icons/user.svg'} alt="user" />
					</li>
				</Link>
			</ul>
		</header>
	)
}

export default Header
