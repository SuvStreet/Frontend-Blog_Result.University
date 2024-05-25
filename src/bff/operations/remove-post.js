import { deleteComment, deletePost, getComments } from '../api'
import { ROLE } from '../constants'
import { sessions } from '../sessions'

export const removePost = async (hash, postId) => {
	const accessRoles = [ROLE.ADMIN]

	if (!sessions.access(hash, accessRoles)) {
		return {
			error: 'Доступ запрещен',
			res: null,
		}
	}

	deletePost(postId)

	const comments = await getComments(postId)

	Promise.all(comments.map((comment) => deleteComment(comment.id)))

	return {
		error: null,
		res: true
	}
}
