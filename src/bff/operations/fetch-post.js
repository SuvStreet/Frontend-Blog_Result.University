import { getComments, getPost } from '../api'

export const fetchPost = async (postId) => {
	try {
		const [post, comments] = await Promise.all([getPost(postId), getComments(postId)])

		return {
			error: null,
			res: {
				...post,
				comments,
			},
		}
	} catch (err) {
		return {
			error: err,
			res: null,
		}
	}
}
