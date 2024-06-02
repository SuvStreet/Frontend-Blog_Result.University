import { setUserRole } from "../api"
import { sessions } from "../sessions"
import { ERROR, ROLE } from "../constants"

export const updateUserRole = async (hash, userId, newUserRoleId) => {
	const accessRoles = [ROLE.ADMIN]

	if (!sessions.access(hash, accessRoles)) {
		return {
			error: ERROR.NO_ACCESS,
			res: null,
		}
	}

	setUserRole(userId, newUserRoleId)

	return {
		error: null,
		res: true,
	}
}
