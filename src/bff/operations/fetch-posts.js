import { getComments, getPosts } from '../api'
import { getCommentsCount, getLastPageFromLinks } from '../utils'

export const fetchPosts = async (page, limit) => {
	const [{ posts, links }, comments] = await Promise.all([
		getPosts(page, limit),
		getComments(),
	])

	const lastPage = getLastPageFromLinks(links)

	return {
		error: null,
		res: {
			posts: posts.map((post) => ({
				...post,
				commentsCount: getCommentsCount(comments, post.id),
			})),
			lastPage,
		},
	}
}
