const initialPostsState = {
	id: '',
	title: '',
	imgUrl: '',
	content: '',
	publishedAt: '',
	comments: [],
}

export const postsReducer = (state = initialPostsState, action) => {
	switch (action.type) {
		default:
			return state
	}
}
