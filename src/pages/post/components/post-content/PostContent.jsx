import { useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types'

import { H2, Icon, Img } from '../../../../components'
import { SpecialPanel } from '../special-panel/SpecialPanel'
import { PROP_TYPES } from '../../../../constants'

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
			<Img src={imgUrl} alt={title} margin='0 20px 10px 0' />
			<H2>{title}</H2>

			<SpecialPanel
				post={{ id, publishedAt }}
				margin='-20px 0 20px'
				editButton={
					<Icon fontSize='1.3rem' iconCode={faPenToSquare} onClick={() => onEdit()} />
				}
			/>

			<div className='post-text'>{content}</div>
		</div>
	)
}

export const PostContent = s(PostContentContainer)`
	& .post-text {
		font-size: 20px;
		white-space: pre-wrap;
	}
`

PostContentContainer.propTypes = {
	className: PropTypes.string.isRequired,
	post: PROP_TYPES.POST.isRequired,
}
