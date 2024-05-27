import PropsType from 'prop-types'

import s from 'styled-components'

const H2Container = ({ children, className }) => {
	return <h2 className={className}>{children}</h2>
}

export const H2 = s(H2Container)`
	margin-bottom: 40px;
`
H2Container.propTypes = {
	children: PropsType.node,
	className: PropsType.string,
}
