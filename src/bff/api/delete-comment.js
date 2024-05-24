export const deleteComment = async (commentId) =>
	fetch(`http://localhost:5000/comments/${commentId}`, {
		method: 'DELETE',
	})
