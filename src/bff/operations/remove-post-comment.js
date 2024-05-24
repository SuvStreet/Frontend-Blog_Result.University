import { deleteComment, getComments, getPost } from '../api'
import { ROLE } from '../constants'
import { sessions } from '../sessions'

export const removePostComment = async (hash, postId, commentId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR]

	if (!sessions.access(hash, accessRoles)) {
		return {
			error: 'Доступ запрещен',
			res: null,
		}
	}

	await deleteComment(commentId)

	const post = await getPost(postId)

	const comments = await getComments(postId)

	return {
		error: null,
		res: {
			...post,
			comments,
		},
	}
}
