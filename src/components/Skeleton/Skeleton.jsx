import ContentLoader from 'react-content-loader'

function Skeleton() {
	return (
		<ContentLoader
			speed={2}
			width={160}
			height={250}
			viewBox="0 0 160 265"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="0" y="0" rx="10" ry="10" width="160" height="155" />
			<rect x="0" y="167" rx="5" ry="5" width="160" height="15" />
			<rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
			<rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
			<rect x="124" y="234" rx="10" ry="10" width="32" height="25" />
		</ContentLoader>
	)
}

export default Skeleton
