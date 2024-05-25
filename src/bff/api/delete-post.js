export const deletePost = async (postId) =>
	fetch(`http://localhost:5000/posts/${postId}`, {
		method: 'DELETE',
	})
