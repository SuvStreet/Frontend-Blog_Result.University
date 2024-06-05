import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types'

import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions'
import { Icon } from '../../../../components'
import { useServerRequest } from '../../../../hooks'
import { selectUserRole } from '../../../../selectors'
import { ROLE } from '../../../../constants'
import { checkAccess } from '../../../../utils'

import { faCalendarDays, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import s from 'styled-components'

const SpecialPanelContainer = ({ className, post: { id, publishedAt }, editButton }) => {
	const dispatch = useDispatch()
	const userRole = useSelector(selectUserRole)
	const navigate = useNavigate()
	const requestServer = useServerRequest()

	const onPostRemove = () => {
		if (userRole !== ROLE.ADMIN) return
		dispatch(
			openModal({
				textModal: 'Вы действительно хотите удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, id)).then(() => navigate('/'))
					dispatch(CLOSE_MODAL)
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		)
	}

	const isAdmin = checkAccess([ROLE.ADMIN], userRole)

	return (
		<div className={className}>
			<div className='published-at'>
				{publishedAt && (
					<Icon
						fontSize='1.2rem'
						iconCode={faCalendarDays}
						margin='0 10px 0 0'
						cursor='default'
					/>
				)}
				{publishedAt}
			</div>
			{isAdmin && (
				<div className='buttons'>
					{editButton}
					{publishedAt && (
						<Icon
							fontSize='1.3rem'
							iconCode={faTrashCan}
							margin='0 0 0 20px'
							onClick={() => onPostRemove()}
						/>
					)}
				</div>
			)}
		</div>
	)
}

export const SpecialPanel = s(SpecialPanelContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: ${({ margin }) => margin || '0 0 20px'};
	font-size: 20px;

	& .published-at {
		display: flex;
		align-items: center;
	}

	& .buttons {
		display: flex;
		align-items: center;
	}
`

SpecialPanelContainer.propTypes = {
	className: PropTypes.string.isRequired,
	post: PropTypes.shape({
		id: PropTypes.string.isRequired,
		publishedAt: PropTypes.string.isRequired,
	}),
	editButton: PropTypes.node.isRequired,
}
