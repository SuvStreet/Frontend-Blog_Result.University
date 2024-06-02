import { getRoles } from '../api'
import { sessions } from '../sessions'
import { ERROR, ROLE } from '../constants'

export const fetchRoles = async (hash) => {
	const accessRoles = [ROLE.ADMIN]

	if (!sessions.access(hash, accessRoles)) {
		return {
			error: ERROR.NO_ACCESS,
			res: null,
		}
	}

	const roles = await getRoles()

	return {
		error: null,
		res: roles,
	}
}
