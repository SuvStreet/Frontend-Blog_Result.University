import { useDispatch, useSelector } from 'react-redux'

import PropsTypes from 'prop-types'

import { CLOSE_MODAL, openModal, removeCommentAsync } from '../../../../../../actions'
import { useServerRequest } from '../../../../../../hooks'
import { Icon } from '../../../../../../components'
import { checkAccess } from '../../../../../../utils'
import { ROLE } from '../../../../../../constants'
import { selectUserRole } from '../../../../../../selectors'

import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { faCalendarDays, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import s from 'styled-components'

const CommentContainer = ({ className, commentId, author, content, publishedAt }) => {
	const userRole = useSelector(selectUserRole)
	const dispatch = useDispatch()
	const requestServer = useServerRequest()

	const onCommentRemove = () => {
		dispatch(
			openModal({
				textModal: 'Вы действительно хотите удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, commentId))
					dispatch(CLOSE_MODAL)
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		)
	}

	const isAdminOrModerator = checkAccess([ROLE.ADMIN, ROLE.MODERATOR], userRole)

	return (
		<div className={className}>
			<div className='comment'>
				<div className='information-panel'>
					<div className='author'>
						<Icon
							fontSize='1.3rem'
							iconCode={faCircleUser}
							margin='0 10px 0 0'
							cursor='default'
						/>
						{author}
					</div>
					<div className='published-at'>
						<Icon
							fontSize='1.3rem'
							iconCode={faCalendarDays}
							margin='0 10px 0 0'
							cursor='default'
						/>
						{publishedAt}
					</div>
				</div>
				<div className='comment-text'>
					<div className='content'>{content}</div>
				</div>
			</div>

			{isAdminOrModerator && (
				<Icon
					fontSize='1.3rem'
					iconCode={faTrashCan}
					margin='0 0 0 20px'
					onClick={() => onCommentRemove()}
				/>
			)}
		</div>
	)
}

export const Comment = s(CommentContainer)`
	display: flex;
	justify-content: space-between;
	margin-top: 10px;

	& .comment {
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 10px;
		width: 100%;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	& .author {
		display: flex;
		align-items: center;
	}

	& .published-at {
		display: flex;
		align-items: center;
	}
`

CommentContainer.propTypes = {
	className: PropsTypes.string,
	commentId: PropsTypes.number,
	author: PropsTypes.string,
	content: PropsTypes.string,
	publishedAt: PropsTypes.string,
}
