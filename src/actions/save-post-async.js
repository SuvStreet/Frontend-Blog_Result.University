import { setPostData } from './set-post-data'

export const savePostAsync = (requestServer, newPostData) => (dispatch) =>
	requestServer('savePost', newPostData).then((LoadedNewPostData) => {
		dispatch(setPostData(LoadedNewPostData.res))

		return LoadedNewPostData.res
	})
