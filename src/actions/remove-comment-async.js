import { URL } from '../constants'
import { request } from '../utils'
import { removeComment } from './remove-comment'

export const removeCommentAsync = (postId, commentId) => (dispatch) =>
	request(`${URL.API}posts/${postId}/comments/${commentId}`, 'DELETE').then(() => {
		dispatch(removeComment(commentId))
	})
