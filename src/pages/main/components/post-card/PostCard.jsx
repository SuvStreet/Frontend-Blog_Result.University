import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import { Icon, Img } from '../../../../components'

import { faCalendarDays, faComments } from '@fortawesome/free-solid-svg-icons'
import s from 'styled-components'

const PostCardContainer = ({
	className,
	id,
	title,
	imgUrl,
	publishedAt,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
			<Img src={imgUrl} alt={title} /* margin='0 0 20px 0' */ />
			<div className='card-footer'>
				<h4>{title}</h4>
				<div className='card-footer__info'>
					<div className='card-footer__info-date'>
						<Icon
							fontSize='1.2rem'
							iconCode={faCalendarDays}
							margin='0 10px 0 0'
							cursor='default'
						/>
						<span>{publishedAt}</span>
					</div>
					<div className='card-footer__info-comments-count'>
						<Icon
							fontSize='1.2rem'
							iconCode={faComments}
							margin='0 10px 0 0'
							cursor='default'
						/>
						<span>{commentsCount}</span>
					</div>
				</div>
			</div>
			</Link>
		</div>
	)
}

export const PostCard = s(PostCardContainer)`
	width: 280px;
	border-radius: 10px;
	border: 1px solid #5e5e5e;

	& .card-footer {
		padding: 10px;
	}

	& .card-footer__info {
		display: flex;
		justify-content: space-between;
	}

	& .card-footer__info-date {
		display: flex;
		align-items: center;
	}

	& .card-footer__info-comments-count {
		display: flex;
		align-items: center;
	}

	& h4 {
		width: 100%;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		padding: 5px 0;
	}

	& img {
		border-radius: 10px 10px 0 0;
		width: 100%;
	}
`

PostCardContainer.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	title: PropTypes.string,
	imgUrl: PropTypes.string,
	publishedAt: PropTypes.string,
	commentsCount: PropTypes.number,
}
