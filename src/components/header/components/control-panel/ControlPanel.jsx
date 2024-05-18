import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Icon, Button } from '../../../../components'
import { selectUserRole, selectUserLogin, selectUserSession } from '../../../../selectors'
import { logout } from '../../../../actions'
import { ROLE } from '../../../../constants'

import {
	faAngleLeft,
	faFileSignature,
	faUsers,
	faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import s from 'styled-components'

const RightAligned = s.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`
const UserName = s.div`
	font-size: 20px;
	font-weight: 700;
`

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const roleId = useSelector(selectUserRole)
	const login = useSelector(selectUserLogin)
	const session = useSelector(selectUserSession)

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to='/login'>Войти</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<Icon
							fontSize='2rem'
							iconCode={faRightFromBracket}
							margin='0 0 0 10px'
							onClick={() => dispatch(logout(session))}
						/>
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon
					fontSize='2.5rem'
					iconCode={faAngleLeft}
					margin='0 10px 0 0'
					onClick={() => navigate(-1)}
				/>
				<Link to='/post'>
					<Icon fontSize='2rem' iconCode={faFileSignature} margin='0 10px 0 0' />
				</Link>
				<Link to='/users'>
					<Icon fontSize='2rem' iconCode={faUsers} margin='0 10px 0 0' />
				</Link>
			</RightAligned>
		</div>
	)
}

export const ControlPanel = s(ControlPanelContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

ControlPanelContainer.propTypes = {
	className: PropTypes.string,
}
