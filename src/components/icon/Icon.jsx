import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import s from 'styled-components'

const IconContainer = ({ className, iconCode }) => {
	return <FontAwesomeIcon className={className} icon={iconCode} />
}

export const Icon = s(IconContainer)`
	display: flex;
	align-items: center;
	font-size: ${(props) => props.size || '32px'};
	margin: ${(props) => props.margin || '0'};
`

IconContainer.propTypes = {
	className: PropTypes.string,
	iconCode: PropTypes.object,
}
