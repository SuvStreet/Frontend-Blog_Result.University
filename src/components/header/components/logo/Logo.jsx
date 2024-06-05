import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Icon } from '../../../../components'

import { faLaptopCode } from '@fortawesome/free-solid-svg-icons'

import s from 'styled-components'

const LargeText = s.div`
	font-size: 32px;
	font-weight: 700;
	line-height: 1.2;
`

const SmallText = s.div`
	font-size: 20px;
	font-weight: 700;
`

const LogoContainer = ({ className }) => {
	return (
		<Link to='/' className={className}>
			<Icon fontSize='4rem' margin='0 10px 0 0' iconCode={faLaptopCode} />
			<div>
				<LargeText>Блог</LargeText>
				<SmallText>Веб-разработчика</SmallText>
			</div>
		</Link>
	)
}

export const Logo = s(LogoContainer)`
	display: flex;
	align-items: center;
`

LogoContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
