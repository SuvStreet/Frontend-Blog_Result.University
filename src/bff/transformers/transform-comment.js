export const transformComment = (dbComment) => {
	return {
		id: dbComment.id,
		author: dbComment.author_login,
		content: dbComment.content,
		postId: dbComment.post_id,
		publishedAt: dbComment.published_at,
	}
}
