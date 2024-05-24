import { setPostData } from './set-post-data'

export const addCommentAsync = (requestServer, userId, userLogin, postId, content) => (dispatch) => {
	requestServer('addPostComment', userId, userLogin, postId, content).then((postData) => {
		dispatch(setPostData(postData.res))
	})
}
