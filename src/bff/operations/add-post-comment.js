import { addComment, getComments, getPost } from '../api'
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

	await addComment(userId, userLogin, postId, content)

	const post = await getPost(postId)

	const comments = await getComments(postId)

	return {
		error: null,
		res: {
			...post,
			comments,
		}
	}
}
