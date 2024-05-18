import PropTypes from 'prop-types'

import s from 'styled-components'

const LoaderContainer = ({ className }) => {
	return <div className={className}></div>
}

export const Loader = s(LoaderContainer)`
	// display: flex;
	// justify-content: center;
	// align-items: center;
	border: 10px solid #414141;
	border-top: 10px solid #3498db;
	border-radius: 50%;
	width: 50px;
	height: 50px;
	animation: spin 1s linear infinite;

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
