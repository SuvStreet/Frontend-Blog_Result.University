import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import s from 'styled-components'

const IconContainer = ({ className, iconCode, ...props }) => {
	return <FontAwesomeIcon className={className} icon={iconCode} {...props} />
}

export const Icon = s(IconContainer)`
	display: flex;
	align-items: center;
	font-size: ${(props) => props.fontSize || '32px'};
	margin: ${(props) => props.margin || '0'};
	color: ${({ disabled }) => disabled && '#5e5e5e'};

	&:hover {
		cursor: ${({ cursor }) => cursor || 'pointer'};
	}
`

IconContainer.propTypes = {
	className: PropTypes.string.isRequired,
	iconCode: PropTypes.object.isRequired,
}
