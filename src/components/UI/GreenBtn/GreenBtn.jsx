import styles from './GreenBtn.module.scss'

function GreenBtn({ text, type, onClick, disabled }) {
	return (
		<button
			disabled={disabled}
			type={'button'}
			className={styles.greenBtn}
			onClick={onClick}
		>
			{text}
			{type === 'right' ? (
				<img
					src={'/img/icons/arrow.svg'}
					alt="arrow"
					className={styles.rightArrow}
				/>
			) : (
				<img
					src={'/img/icons/back-arrow.svg'}
					alt="arrow"
					className={styles.leftArrow}
				/>
			)}
		</button>
	)
}

export default GreenBtn
