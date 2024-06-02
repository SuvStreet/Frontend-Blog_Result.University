import { deleteComment } from '../api'
import { ERROR, ROLE } from '../constants'
import { sessions } from '../sessions'

export const removePostComment = async (hash, commentId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR]

	if (!sessions.access(hash, accessRoles)) {
		return {
			error: ERROR.NO_ACCESS,
			res: null,
		}
	}

	deleteComment(commentId)

	return {
		error: null,
		res: commentId
	}
}
