import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { setUser } from '../../actions'
import { AuthFormError, Button, H2, Input } from '../../components'
import { request } from '../../utils'
import { URL } from '../../constants'

import s from 'styled-components'

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Логин не может быть пустым')
		.matches(/^[A-Za-zА-Яа-я0-9]+$/, 'Неверный логин. Допускаются только буквы и цифры')
		.min('4', 'Неверный логин. Минимальная длина логина - 4 символа')
		.max('15', 'Неверный логин. Максимальная длина логина - 15 символов'),

	password: yup
		.string()
		.required('Пароль не может быть пустым')
		.matches(
			/^[A-Za-zА-Яа-я0-9#%]+$/,
			'Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %',
		)
		.min('4', 'Неверный пороль. Минимальная длина пороля - 4 символа')
		.max('30', 'Неверный пороль. Максимальная длина пороля - 30 символов'),
})

const StyledLink = s(Link)`
	text-decoration: underline;
	text-align: center;
	margin: 10px 0;
	font-weight: 700;
	font-size: 20px;
`

const AuthorizationContainer = ({ className }) => {
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	})

	const [serverError, setServerError] = useState(null)

	const dispatch = useDispatch()

	useEffect(() => {
		if (localStorage.getItem('currentUserData')) {
			navigate('/')
		}
	}, [navigate])

	const onSubmit = ({ login, password }) => {
		request(`${URL.API}login`, 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`)
				return
			}

			dispatch(setUser(user))
			localStorage.setItem('currentUserData', JSON.stringify(user))
			navigate('/')
		})
	}

	const formError = errors?.login?.message || errors?.password?.message

	const errorMessage = formError || serverError

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type='text'
					{...register('login', { onChange: () => setServerError(null) })}
					placeholder='Логин'
				/>
				<Input
					type='password'
					{...register('password', { onChange: () => setServerError(null) })}
					placeholder='Пароль'
				/>
				<Button type='submit' disabled={!!formError} height='40px'>
					Авторизоваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<StyledLink to='/register'>Регистрация</StyledLink>
			</form>
		</div>
	)
}

export const Authorization = s(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 40px 0;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`

AuthorizationContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
