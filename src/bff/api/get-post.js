import { ERROR } from '../constants'
import { transformPost } from '../transformers'

export const getPost = async (postId) =>
	fetch(`http://localhost:5000/posts/${postId}`)
		.then((res) => {
			if (res.ok) {
				return res
			}

			const error =
				res.status === 404
					? ERROR.NO_POST
					: ERROR.NO_DATA

			return Promise.reject(error)
		})
		.then((loadedPost) => loadedPost.json())
		.then((loadedPost) => loadedPost && transformPost(loadedPost))
