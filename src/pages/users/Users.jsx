import PropsType from 'prop-types'
import { useEffect, useState } from 'react'

import { H2, PrivateContent, Loader } from '../../components'
import { UserRow, TableRow } from './components'
import { ROLE } from '../../constants'

import s from 'styled-components'
import { request } from '../../utils'

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([])
	const [roles, setRoles] = useState([])
	const [loading, setLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false)

	useEffect(() => {
		Promise.all([request('/api/users'), request('/api/users/roles')])
			.then(([usersRes, roleRes]) => {
				if (usersRes.error || roleRes.error) {
					setErrorMessage(usersRes.error || roleRes.error)
					return
				}

				setUsers(usersRes.data)
				setRoles(roleRes.data)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [shouldUpdateUserList])

	const onUserRemove = (userId) => {
		request(`/api/users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList)
		})
	}

	return (
		<div className={className}>
			{loading ? (
				<Loader />
			) : (
				<PrivateContent serverError={errorMessage}>
					<>
						<H2>Пользователи</H2>
						<div>
							<TableRow>
								<div className='login-column'>Логин</div>
								<div className='registered-at-column'>Дата регистрации</div>
								<div className='role-column'>Роль</div>
							</TableRow>
							{users.map(({ id, login, registeredAt, roleId }) => (
								<UserRow
									key={id}
									id={id}
									login={login}
									registeredAt={registeredAt}
									roleId={roleId}
									roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
									onUserRemove={() => onUserRemove(id)}
								/>
							))}
						</div>
					</>
				</PrivateContent>
			)}
		</div>
	)
}

export const Users = s(UsersContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 40px auto;
	width: 570px;
`

UsersContainer.propTypes = {
	className: PropsType.string.isRequired,
}
