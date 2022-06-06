import styles from './Search.module.scss'

function Search({ searchValue, onChangeSearchValue, onClearSearchValue }) {
	return (
		<div className={styles.searchBlock}>
			<img src={'/img/icons/search.svg'} alt="search" />
			<input
				type="text"
				placeholder={'Поиск...'}
				value={searchValue}
				width={18}
				height={18}
				onChange={onChangeSearchValue}
			/>
			{searchValue && (
				<img
					src={'/img/icons/cancel.svg'}
					alt="cancel"
					width={18}
					height={18}
					className={styles.clear}
					onClick={onClearSearchValue}
				/>
			)}
		</div>
	)
}

export default Search
