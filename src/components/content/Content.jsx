import PropsType from 'prop-types'

import { H2 } from '../h2/H2'

import s from 'styled-components'

const Div = s.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

export const Content = ({ children, error }) => {
	return error ? (
		<Div>
			<H2>Ошибка</H2>
			<div>{error}</div>
		</Div>
	) : (
		children
	)
}

Content.propTypes = {
	children: PropsType.node,
	error: PropsType.string,
}
