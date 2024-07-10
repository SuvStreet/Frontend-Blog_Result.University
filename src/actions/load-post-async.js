import { URL } from '../constants'
import { request } from '../utils'
import { setPostData } from './set-post-data'

export const loadPostAsync = (postId) => (dispatch) =>
	request(`${URL.API}posts/${postId}`).then((postData) => {
		if (postData.data) {
			dispatch(setPostData(postData.data))
		}
		return postData
	})
