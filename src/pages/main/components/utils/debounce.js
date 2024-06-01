export const debounce = (func, wait) => {
	let timeoutId

	return (...args) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(func, wait, args)
	}


	// let timeout
	// return function () {
	// 	const context = this
	// 	const args = arguments
	// 	clearTimeout(timeout)
	// 	timeout = setTimeout(() => {
	// 		func.apply(context, args)
	// 	}, wait)
	// }
}
