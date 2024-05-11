import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-regular-svg-icons'
import { faReact } from '@fortawesome/free-brands-svg-icons'
import s from 'styled-components'

const Div = s.div`
	text-align: center;
	font-size: 120px;
	font-weight: bold;
	color: red;
`

function App() {
	return (
		<>
			<Div>App</Div>
			<FontAwesomeIcon icon={faPhone} size='10x' color='blue' />
			<FontAwesomeIcon icon={faSun} size='10x' style={{ color: "#ffd43b" }} />
			<FontAwesomeIcon icon={faReact} size='10x' />
		</>
	)
}

export default App
