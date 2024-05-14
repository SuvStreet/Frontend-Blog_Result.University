import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { server } from '../../bff'
import { setUser } from '../../actions'
import { Button, H2, Input } from '../../components'

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

const ErrorMessageDiv = s.div`
	background-color: #ff4f4f;
	color: black;
	// color: red;
	padding: 10px 5px;
	border-radius: 10px;
	margin: 10px 0;
	text-align: center;
	font-size: 20px;
	line-height: 1;
`

const AuthorizationContainer = ({ className }) => {
	const navigate = useNavigate();

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

	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`)
				return
			}

			dispatch(setUser(res))
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
				{errorMessage && <ErrorMessageDiv>{errorMessage}</ErrorMessageDiv>}
				<StyledLink to='/register'>Регистрация</StyledLink>
			</form>
		</div>
	)
}

export const Authorization = s(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 40px;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`

AuthorizationContainer.propTypes = {
	className: PropTypes.string,
}
