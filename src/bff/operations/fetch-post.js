import { getComments, getPost } from '../api'

export const fetchPost = async (postId) => {
	const [post, comments] = await Promise.all([getPost(postId), getComments(postId)])

	return {
		error: null,
		res: {
			...post,
			comments,
		},
	}
}
