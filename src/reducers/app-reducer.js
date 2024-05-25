import { ACTION_TYPE } from '../actions'

const initialAppState = {
	loading: false,
	modal: {
		isOpen: false,
		textModal: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
}

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {

		case ACTION_TYPE.SET_LOADING:
			return {
				...state,
				loading: action.payload,
			}

		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...action.payload,
					isOpen: true,
				},
			}

		case ACTION_TYPE.CLOSE_MODAL:
			return initialAppState

		default:
			return state
	}
}
