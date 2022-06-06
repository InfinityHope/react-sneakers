import GreenBtn from '../UI/GreenBtn/GreenBtn'

function Info({ onClose, description, title, img }) {
	return (
		<div className={'d-flex align-center justify-center flex-column flex'}>
			<img className={'mb-20'} width={120} height={120} src={img} alt="empty" />
			<h2>{title}</h2>
			<p className="opacity-6 text-center">{description}</p>
			<GreenBtn onClick={onClose} text={'Вернуться назад'} />
		</div>
	)
}

export default Info
