import { URL } from '../constants'
import { request } from '../utils'
import { setPostData } from './set-post-data'

export const savePostAsync = (id, newPostData) => (dispatch) => {
	const saveRequest = id
		? request(`${URL.API}posts/${id}`, 'PATCH', newPostData)
		: request(`${URL.API}posts`, 'POST', newPostData)

	return saveRequest.then((LoadedNewPostData) => {
		dispatch(setPostData(LoadedNewPostData.data))

		return LoadedNewPostData.data
	})
}
