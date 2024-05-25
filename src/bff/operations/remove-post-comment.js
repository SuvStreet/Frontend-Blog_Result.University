import { deleteComment } from '../api'
import { ROLE } from '../constants'
import { sessions } from '../sessions'

export const removePostComment = async (hash, commentId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR]

	if (!sessions.access(hash, accessRoles)) {
		return {
			error: 'Доступ запрещен',
			res: null,
		}
	}

	deleteComment(commentId)

	return {
		error: null,
		res: commentId
	}
}
