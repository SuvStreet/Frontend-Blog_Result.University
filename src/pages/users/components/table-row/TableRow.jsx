import PropTypes from 'prop-types'

import s from 'styled-components'

const TableRowContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>
}

export const TableRow = s(TableRowContainer)`
	display: flex;
	align-items: center;
	border: ${({ border }) => (border ? '1px solid #ccc' : 'none')};
	border-radius: 5px;

	& > div {
		display: flex;
		padding: 0 10px;
	}

	& .login-column {
		width: 150px;
	}

	& .registered-at-column {
		width: 180px;
	}

	& .role-column {
		width: 210px;
	}
`

TableRowContainer.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
}
