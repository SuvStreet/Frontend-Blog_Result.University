import { addPost, updatePost } from '../api'
import { sessions } from '../sessions'
import { ERROR, ROLE } from '../constants'

export const savePost = async (hash, newPostData) => {
	const accessRoles = [ROLE.ADMIN]

	if (!sessions.access(hash, accessRoles)) {
		return {
			error: ERROR.NO_ACCESS,
			res: null,
		}
	}

	const savePost =
		newPostData.id === '' ? await addPost(newPostData) : await updatePost(newPostData)

	return {
		error: null,
		res: savePost,
	}
}
