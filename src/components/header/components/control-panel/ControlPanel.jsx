import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'

import { Icon } from '../../../../components'

import { faAngleLeft, faFileSignature, faUsers } from '@fortawesome/free-solid-svg-icons'

import s from 'styled-components'

const RightAligned = s.div`
	display: flex;
	justify-content: flex-end;
`

const StyledLink = s(Link)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	width: 100%;
	height: 30px;
	background-color: transparent;
	border: 1px solid #5e5e5e;
	border-radius: 10px;
	// box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
`

const StyledButton = s.div`
	&:hover {
		cursor: pointer;
	}
`

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate()

	return (
		<div className={className}>
			<RightAligned>
				<StyledLink to='/login'>Войти</StyledLink>
			</RightAligned>
			<RightAligned>
				<StyledButton onClick={() => navigate(-1)}>
					<Icon size='2.3rem' iconCode={faAngleLeft} margin='0 10px 0 0' />
				</StyledButton>
				<Link to='/post'>
					<Icon size='2rem' iconCode={faFileSignature} margin='0 10px 0 0' />
				</Link>
				<Link to='/users'>
					<Icon size='2rem' iconCode={faUsers} margin='0 10px 0 0' />
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
