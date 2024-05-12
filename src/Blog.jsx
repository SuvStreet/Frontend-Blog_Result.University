import { Routes, Route } from 'react-router-dom'

import { Header, Footer } from './components'

import s from 'styled-components'

const AppColumn = s.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	max-width: 1000px;
	width: 100%;
	min-height: 100dvh;
	margin: 0 auto;
	background-color: #242424;
	// color: black;
`

const Content = s.div`
	padding: 120px 0;
	// min-height: 500vh;
	width: 1000px;
`
const H2 = s.h2`
	text-align: center;
`

export const Blog = () => {
	return (
		<AppColumn>
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
		</AppColumn>
	)
}
