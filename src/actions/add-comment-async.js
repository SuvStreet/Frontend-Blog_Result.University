import { setNewComment } from './set-new-comment'

export const addCommentAsync =
	(requestServer, userId, userLogin, postId, content) => (dispatch) => {
		requestServer('addPostComment', userId, userLogin, postId, content).then(
			(savedComment) => {
				dispatch(setNewComment(savedComment.res))
			},
		)
	}
