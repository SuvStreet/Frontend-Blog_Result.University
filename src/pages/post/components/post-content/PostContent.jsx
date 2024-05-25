import { useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types'

import { H2, Icon } from '../../../../components'
import { SpecialPanel } from '../special-panel/SpecialPanel'

import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import s from 'styled-components'

const PostContentContainer = ({
	className,
	post: { id, title, imgUrl, content, publishedAt },
}) => {
	const navigate = useNavigate()

	const onEdit = () => {
		navigate(`/post/${id}/edit`)
	}

	return (
		<div className={className}>
			<img src={imgUrl} alt={title} />
			<H2>{title}</H2>

			<SpecialPanel
				post={{ id, publishedAt }}
				margin='-20px 0 20px'
				editButton={
					<Icon
						fontSize='1.3rem'
						iconCode={faPenToSquare}
						margin='0 20px 0 0'
						onClick={() => onEdit()}
					/>
				}
			/>

			<div className='post-text'>{content}</div>
		</div>
	)
}

export const PostContent = s(PostContentContainer)`
	& img {
		width: 280px;
		height: 150px;
		object-fit: cover;
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		font-size: 20px;
		white-space: pre-wrap;
	}
`

PostContentContainer.propTypes = {
	className: PropTypes.string,
	post: PropTypes.object,
}
