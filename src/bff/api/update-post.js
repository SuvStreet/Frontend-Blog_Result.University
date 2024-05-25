export const updatePost = ({id, imgUrl, title, content}) =>
	fetch(`http://localhost:5000/posts/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			title,
			img_url: imgUrl,
			content,
		}),
	})
