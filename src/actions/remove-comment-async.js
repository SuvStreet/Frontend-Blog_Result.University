import { removeComment } from './remove-comment'

export const removeCommentAsync = (requestServer, commentId) => (dispatch) =>
	requestServer('removePostComment', commentId).then((removedIdComment) => {
		dispatch(removeComment(removedIdComment.res))
	})
