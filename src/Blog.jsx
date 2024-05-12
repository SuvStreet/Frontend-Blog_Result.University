// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPhone } from '@fortawesome/free-solid-svg-icons'
// import { faSun } from '@fortawesome/free-regular-svg-icons'
// import { faReact } from '@fortawesome/free-brands-svg-icons'
import { Routes, Route } from 'react-router-dom'
import s from 'styled-components'

const Content = s.div`
	padding: 120px 0;
`
const H2 = s.h2`
	text-align: center;
`

const Header = () => {
	return (
		<>
			<div>Header</div>
		</>
	)
}

const Footer = () => {
	return (
		<>
			<div>Footer</div>
		</>
	)
}

export const Blog = () => {
	return (
		<>
			<Header />
			<Content>
				<H2>Page Content</H2>
				<Routes>
					<Route path='/' element={<div>Главная страница</div>} />
					<Route path='/login' element={<div>Авторизация</div>} />
					<Route path='/register' element={<div>Регистрация</div>} />
					<Route path='/users' element={<div>Пользователи</div>} />
					<Route path='/post' element={<div>Новая Статья</div>} />
					<Route path='/post/:postId' element={<div>Статья</div>} />
					<Route path='*' element={<div>Ошибка</div>} />
				</Routes>
			</Content>
			<Footer />
		</>
	)
}
