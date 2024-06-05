import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useServerRequest } from '../../hooks'
import { setUser } from '../../actions'
import { AuthFormError, Button, H2, Input } from '../../components'

import s from 'styled-components'

const regFormSchema = yup.object().shape({
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
	passcheck: yup
		.string()
		.required('Поле "повтора пороля" не может быть пустым')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
})

const RegistrationContainer = ({ className }) => {
	const navigate = useNavigate()
	const requestServer = useServerRequest()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	})

	const [serverError, setServerError] = useState(null)

	const dispatch = useDispatch()

	useEffect(() => {
		if (localStorage.getItem('currentUserData')) {
			navigate('/')
		}
	}, [navigate])

	const onSubmit = ({ login, password }) => {
		requestServer('register', login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`)
				return
			}

			dispatch(setUser(res))
			localStorage.setItem('currentUserData', JSON.stringify(res.session))
			navigate('/')
		})
	}

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message

	const errorMessage = formError || serverError

	return (
		<div className={className}>
			<H2>Регистрация</H2>
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
				<Input
					type='password'
					{...register('passcheck', { onChange: () => setServerError(null) })}
					placeholder='Повторите пороль'
				/>
				<Button type='submit' disabled={!!formError} height='40px'>
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	)
}

export const Registration = s(RegistrationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 40px;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`

RegistrationContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
