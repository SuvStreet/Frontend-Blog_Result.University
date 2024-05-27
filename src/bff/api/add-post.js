import { transformPost } from '../transformers'
import { generateDate } from '../utils'

export const addPost = ({imgUrl, title, content}) =>
	fetch('http://localhost:5000/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			img_url: imgUrl,
			published_at: generateDate(),
			title,
			content,
		}),
	})
		.then((loadedPost) => loadedPost.json())
		.then((loadedPost) => loadedPost && transformPost(loadedPost))
