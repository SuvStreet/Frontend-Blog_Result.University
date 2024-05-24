export const transformComment = (dbComment) => {
	return {
		id: dbComment.id,
		author: dbComment.author_login,
		content: dbComment.content,
		publishedAt: dbComment.published_at,
	}
}
