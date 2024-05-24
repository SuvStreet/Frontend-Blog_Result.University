import PropTypes from 'prop-types'

import s from 'styled-components'

const LoaderContainer = ({ className }) => {
	return <div className={className}>
		<div className='loader'></div>
	</div>
}

export const Loader = s(LoaderContainer)`
	height: ${(props) => props.height || 'auto'};
	display: flex;
	justify-content: center;
	align-items: center;

	& .loader {
		margin: 0 auto;
		border: 10px solid #414141;
		border-top: 10px solid #3498db;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`

LoaderContainer.propTypes = {
	className: PropTypes.string,
}
