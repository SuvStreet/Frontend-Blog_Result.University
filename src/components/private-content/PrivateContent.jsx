import PropsType from 'prop-types'

import { Error } from '../error/Error'

export const PrivateContent = ({ children, serverError = null }) => {
	return serverError ? <Error error={serverError} noAccess /> : children
}

PrivateContent.propTypes = {
	children: PropsType.node,
	serverError: PropsType.string,
}
