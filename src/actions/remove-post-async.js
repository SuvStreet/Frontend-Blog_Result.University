import { REMOVE_POST } from './remove-post'

export const removePostAsync = (requestServer, postId) => (dispatch) =>
	requestServer('removePost', postId).then(() => {
		dispatch(REMOVE_POST)
	})
