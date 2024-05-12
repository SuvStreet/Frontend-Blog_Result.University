import PropTypes from 'prop-types'

import { Logo, ControlPanel } from './components'

import s from 'styled-components'

const Description = s.div`
	font-size: 17px;
	font-style: italic;
	line-height: 1.2;
`

const HeaderContainer = ({ className }) => {
	return (
		<header className={className}>
			<Logo />

			<Description>
				Блог о фронтенд разработке:
				<br />
				советы, инструкции и тренды.
				<br />
				Узнайте, как создавать современные
				<br />
				пользовательские интерфейсы! 🚀
			</Description>

			<ControlPanel />
		</header>
	)
}

export const Header = s(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	background-color: #242424;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

HeaderContainer.propTypes = {
	className: PropTypes.string,
}
