import PropTypes from 'prop-types'

import { Icon } from '../icon/Icon'

import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import s from 'styled-components'

const LoaderContainer = ({ className }) => {
	return (
		<div className={className}>
			<Icon iconCode={faSpinner} fontSize='5rem' spinPulse />
		</div>
	)
}

export const Loader = s(LoaderContainer)`
	height: ${(props) => props.height || 'calc(100dvh - 342px)'};
	display: flex;
	justify-content: center;
	align-items: center;
`

LoaderContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
