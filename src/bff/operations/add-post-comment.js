import { addComment } from '../api'
import { ROLE } from '../constants'
import { sessions } from '../sessions'

export const addPostComment = async (hash, userId, userLogin, postId, content) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER]

	if (!sessions.access(hash, accessRoles)) {
		return {
			error: 'Доступ запрещен',
			res: null,
		}
	}

	const comment = await addComment(userId, userLogin, postId, content)

	return {
		error: null,
		res: comment,
	}
}
