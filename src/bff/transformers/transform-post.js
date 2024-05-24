export const transformPost = (dbPost) => {
	return {
		id: dbPost.id,
		title: dbPost.title,
		imgUrl: dbPost.img_url,
		content: dbPost.content,
		publishedAt: dbPost.published_at,
	}
}
