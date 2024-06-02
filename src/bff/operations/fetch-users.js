import { getUsers } from '../api'
import { sessions } from '../sessions'
import { ERROR, ROLE } from '../constants'

export const fetchUsers = async (hash) => {
	const accessRoles = [ROLE.ADMIN]

	if (!sessions.access(hash, accessRoles)) {
		return {
			error: ERROR.NO_ACCESS,
			res: null,
		}
	}

	const users = await getUsers()

	return {
		error: null,
		res: users,
	}
}
