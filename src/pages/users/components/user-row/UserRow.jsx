import PropsType from 'prop-types'
import { useState } from 'react'

import { Icon } from '../../../../components'
import { TableRow } from '../table-row/TableRow'
import { useServerRequest } from '../../../../hooks'
import { ROLE } from '../../../../constants'

import { faFloppyDisk, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import s from 'styled-components'

const UserRowContainer = ({
	className,
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId)
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId)
	const requestServer = useServerRequest()

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value))
	}

	const isSaveButtonDisabled = selectedRoleId === initialRoleId

	const onRoleSave = (userId, newUserRoleId) => {
		if (isSaveButtonDisabled) return
		requestServer('updateUserRole', userId, newUserRoleId).then(() => {
			setInitialRoleId(newUserRoleId)
		})
	}

	return (
		<div className={className}>
			<TableRow border>
				<div className='login-column'>{login}</div>
				<div className='registered-at-column'>{registeredAt}</div>

				<div className='role-column'>
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<Icon
						fontSize='1.3rem'
						iconCode={faFloppyDisk}
						disabled={isSaveButtonDisabled}
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</div>
			</TableRow>
			<Icon
				fontSize='1.3rem'
				iconCode={faTrashCan}
				margin='0 0 0 10px'
				onClick={onUserRemove}
			/>
		</div>
	)
}

export const UserRow = s(UserRowContainer)`
	display: flex;
	align-items: center;
	margin-top: 10px;
	font-size: 1.2rem;

	& select {
		font-size: 1.2rem;
		margin-right: 5px;
		background-color: transparent;
		border-radius: 5px;
		padding: 0 0 0 5px;
		color: #fff;
		cursor: pointer;

		& option {
			color: #fff;
			background-color: #242424;
		}
	}

	& .role-column {
		display: flex;
		align-items: center;
	}
`

UserRowContainer.propTypes = {
	className: PropsType.string.isRequired,
	id: PropsType.string.isRequired,
	login: PropsType.string.isRequired,
	registeredAt: PropsType.string.isRequired,
	roleId: PropsType.number.isRequired,
	roles: PropsType.arrayOf(
		PropsType.shape({
			id: PropsType.oneOf(Object.values(ROLE)),
			name: PropsType.string.isRequired,
		}),
	).isRequired,
	onUserRemove: PropsType.func.isRequired,
}
