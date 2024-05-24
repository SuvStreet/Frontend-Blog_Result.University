import { generateDate } from '../utils'

export const addComment = (userId, userLogin, postId, content) =>
	fetch('http://localhost:5000/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			author_id: userId,
			author_login: userLogin,
			post_id: postId,
			published_at: generateDate(),
			content,
		}),
	})
