import { updatePost } from '../api'
import { sessions } from '../sessions'
import { ROLE } from '../constants'

export const savePost = async (hash, newPostData) => {
	const accessRoles = [ROLE.ADMIN]

	if (!sessions.access(hash, accessRoles)) {
		return {
			error: 'Доступ запрещен',
			res: null,
		}
	}
	
	updatePost(newPostData)

	return {
		error: null,
		res: true,
	}
}
