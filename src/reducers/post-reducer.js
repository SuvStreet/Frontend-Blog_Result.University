import { ACTION_TYPE } from '../actions'

const initialPostState = {
	id: '',
	title: '',
	imgUrl: '',
	content: '',
	publishedAt: '',
	comments: [],
}

export const postReducer = (state = initialPostState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_POST_DATA:
			return {
				...state,
				...action.payload,
			}

		case ACTION_TYPE.SET_NEW_COMMENT:
			return {
				...state,
				comments: [...state.comments, action.payload],
			}

		case ACTION_TYPE.DELETE_COMMENT:
			return {
				...state,
				comments: state.comments.filter((comment) => comment.id !== action.payload),
			}

		case ACTION_TYPE.DELETE_POST:
			return initialPostState

		default:
			return state
	}
}
