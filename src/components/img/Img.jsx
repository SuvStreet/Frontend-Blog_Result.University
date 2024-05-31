import PropTypes from 'prop-types'

import s from 'styled-components'

const ImgContainer = ({ className, src, alt, ...props }) => {
	return <img className={className} src={src} alt={alt} {...props} />
}

export const Img = s(ImgContainer)`
	display: block;
	width: 280px;
	height: 150px;
	object-fit: cover;
	float: left;
	margin: ${({ margin }) => margin || '0 auto'};
`

ImgContainer.propTypes = {
	className: PropTypes.string,
	src: PropTypes.string,
	alt: PropTypes.string,
}
