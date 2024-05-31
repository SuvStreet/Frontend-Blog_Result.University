import { transformComment } from '../transformers'

const ALL_COMMENTS_URL = 'http://localhost:5000/comments'
const ALL_COMMENTS_URL_TO_POST = 'http://localhost:5000/comments?post_id='

export const getComments = (postId) => {
	const url =
		postId === undefined ? ALL_COMMENTS_URL : `${ALL_COMMENTS_URL_TO_POST}${postId}`

	return fetch(url)
		.then((loadedComments) => loadedComments.json())
		.then((loadedComments) => loadedComments && loadedComments.map(transformComment))
}
