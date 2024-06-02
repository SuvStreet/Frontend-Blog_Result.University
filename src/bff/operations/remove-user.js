import { ERROR, ROLE } from "../constants"
import { deleteUser } from "../api"
import { sessions } from "../sessions"

export const removeUser = async (hash, userId) => {
	const accessRoles = [ROLE.ADMIN]

	if (!sessions.access(hash, accessRoles)) {
		return {
			error: ERROR.NO_ACCESS,
			res: null,
		}
	}

	deleteUser(userId)

	return {
		error: null,
		res: true,
	}
}
