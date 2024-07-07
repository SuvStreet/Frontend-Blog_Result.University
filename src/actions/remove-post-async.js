import { request } from '../utils'
import { REMOVE_POST } from './remove-post'

export const removePostAsync = (postId) => (dispatch) =>
	request(`/api/posts/${postId}`, 'DELETE').then(() => {
		dispatch(REMOVE_POST)
	})
