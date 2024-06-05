import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import s from 'styled-components'

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('')
	const [temperature, setTemperature] = useState('')
	const [weather, setWeather] = useState('')

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=ru&appid=0313d885acda1a8b08d1a73694ed2803',
		)
			.then((res) => res.json())
			.then(({ name, main, weather }) => {
				setCity(name)
				setTemperature(Math.round(main.temp))
				setWeather(weather[0].description)
			})
	}, [])

	return (
		<div className={className}>
			<div>
				<div>Блог Веб-разработчика</div>
				<div>Result.University</div>
			</div>
			<div>
				<div>{city}</div>
				<div>
					{temperature}°C, {weather}
				</div>
				<div>
					{new Date().toLocaleDateString('ru', {
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					})}
					, {new Date().toLocaleTimeString().substring(0, 5)}
				</div>
			</div>
		</div>
	)
}

export const Footer = s(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0 -6px 20px 0 rgba(0, 0, 0, 0.19);
	font-weight: 700;
`

FooterContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
