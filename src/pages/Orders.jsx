import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../components/Card/Card'
import Info from '../components/Info/Info'
import { useNavigate } from 'react-router'

function Orders() {
	const [orders, setOrders] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	let navigate = useNavigate()

	useEffect(() => {
		;(async () => {
			try {
				const orders = await axios.get(
					'https://628ffcdf665ea71fe12b7ae5.mockapi.io/orders'
				)
				setOrders(orders.data)
				setIsLoading(false)
			} catch (e) {
				alert('Не удалось выполнить запрос к бд')
				console.error(e)
			}
		})()
	}, [])

	const renderProducts = () => {
		return (isLoading ? [...Array(8)] : orders).map((order, index) => (
			<div key={index}>
				<h2 className={'d-block w100p'}>Заказ #{order && order.id}</h2>
				<div className="content-products">
					{order &&
						order.items.map((item, index) => (
							<Card isOrder={true} key={index} {...item} />
						))}
				</div>
			</div>
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
				<h1 className={'content-title'}>Мои заказы</h1>
			</div>
			<div>
				{orders.length !== 0 ? (
					renderProducts()
				) : (
					<Info
						onClose={() => navigate('/')}
						description={'Вы нищеброд? Оформите хотя бы один заказ.'}
						title={'У вас нет заказов '}
						img={'/img/emoji-sad.png'}
					/>
				)}
			</div>
		</div>
	)
}

export default Orders
